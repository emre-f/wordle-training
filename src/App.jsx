import React from "react"
import { words } from "./data"
import { possible_answers } from "./answers_data"
import Letter from './components/Letter'
import Keyboard from './components/Keyboard'
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

function App() {
  const rows = 6
  const wordLength = 5
  const alphabet = [...'abcdefghijklmnopqrstuvwxyz'];
  let keysHit = new Set(); // Can't repeat keys, keep track what is held down

  const [game, setGame] = React.useState(localStorage.getItem("game") || 'false') // Is game won
  const [targetWord, setTargetWord] = React.useState(localStorage.getItem("targetWord") || getWord()) // Word we are trying to find
  const [currentWord, setCurrentWord] = React.useState("") // Word we are currently typing
  const [wordRows, setWordRows] = React.useState([])
  const [pastWords, setPastWords] = React.useState(JSON.parse(localStorage.getItem("pastWords")) || []) // Words we have already attempted
  const [errorMessage, setErrorMessage] = React.useState('') // Error message to display
  const [keyboardKeys, setKeyboardKeys] = React.useState(JSON.parse(localStorage.getItem("keyboardKeys")) || getFreshKeyboardKeys())

  // Create set of keyboard objects (that aren't labelled 'miss', 'green', or 'yellow')
  function getFreshKeyboardKeys() {
    var res = {}
    for (let i = 0; i < alphabet.length; i++) {
      res[alphabet[i]] = ''
    }

    localStorage.setItem("keyboardKeys", JSON.stringify(res))
    return res
  }

  // Set the game state to true, which means game is over and word was guessed correctly
  function winGame() {
    setGame('true');
    localStorage.setItem("game", 'true')
  }

  // Restart the game state
  function restartGame() {
    setGame('false');
    localStorage.setItem("game", 'false')
    setTargetWord(getWord())
    setCurrentWord("")
    setPastWords([])
    setErrorMessage('')
    localStorage.setItem("pastWords", JSON.stringify([]))
    setKeyboardKeys(getFreshKeyboardKeys())
  }

  /* 
  Compare the enteredWord to targetWord. 
  Also updates the keyboard keys and returns the match results of the two words
  */
  function calculateWordMatches(enteredWord, targetWord) {
    let matchInfo = Array(wordLength).fill('miss'); // Array of states
    let leftOverLetters = targetWord.split('') // Letters that haven't been matched yet

    // Update keyboard keys
    var updatedKeyboardKeys = keyboardKeys
    for (let i = 0; i < wordLength; i++) {
      if (updatedKeyboardKeys[enteredWord.charAt(i)] === 'green' || updatedKeyboardKeys[enteredWord.charAt(i)] === 'yellow') { continue; } // Skip if labelled
      updatedKeyboardKeys[enteredWord.charAt(i)] = 'miss'
    }

    // Calculate the greens
    for (let i = 0; i < wordLength; i++) {
      if (enteredWord.charAt(i) === targetWord.charAt(i)) {
        matchInfo[i] = 'green'
        leftOverLetters[i] = ''
        updatedKeyboardKeys[enteredWord.charAt(i)] = 'green'
      }
    }

    // Calculate the yellows
    for (let i = 0; i < wordLength; i++) {
      if (matchInfo[i] === 'green') { continue; } // Skip if already green

      if (leftOverLetters.includes(enteredWord.charAt(i))) {
        matchInfo[i] = 'yellow'
        leftOverLetters[leftOverLetters.indexOf(enteredWord.charAt(i))] = '' // Remove from leftovers
        if (updatedKeyboardKeys[enteredWord.charAt(i)] !== 'green') { // Skip if green 
          updatedKeyboardKeys[enteredWord.charAt(i)] = 'yellow'
        } 
      }
    }

    // Set the keyboard matches
    localStorage.setItem("keyboardKeys", JSON.stringify(updatedKeyboardKeys))

    return matchInfo
  }
  
  /* 
  Called when a word is submitted by hitting 'Enter'. 
  If the word is suitable, compares the words and updates pastWords and currentWord states
  */
  function checkWord(word) {
    if (pastWords.length >= rows) {
      return;
    }

    if (word === targetWord) {
      winGame()
    } else if (pastWords.length >= rows - 1) {
      setErrorMessage("Out of tries, correct word was " + targetWord)
    }

    if (word.length !== wordLength) {
      setErrorMessage("Word must be " + wordLength + " letters long")
      return
    }

    if (!words.includes(word)) {
      setErrorMessage("Word must be in the dictionary")
      return
    }

    let nextPastWord = {word: word, matchInfo: calculateWordMatches(word, targetWord)}
    let pastWordsCopy = [...pastWords]
    pastWordsCopy.push(nextPastWord)
    setPastWords(pastWordsCopy); // Add word to past words
    localStorage.setItem("pastWords", JSON.stringify(pastWordsCopy))
    setCurrentWord(""); // Clear current word
  }

  // Get the word that will be the target for the current game
  function getWord() { 
    let word = possible_answers[Math.floor(Math.random() * possible_answers.length)];
    localStorage.setItem("targetWord", word)
    return word
  }

  // Get a single row
  function getRow(info) {
    const row = []

    for (let i = 0; i < wordLength; i++) {
      let char = info.word.charAt(i)? info.word.charAt(i).toUpperCase() : ''
      let state = info.matchInfo[i]? info.matchInfo[i] : ''

      row.push(
        <Letter key={nanoid()} value={char} state={state} />
      )
    }
    return row
  }

  // Set the words for all the rows
  function setAllRows() {
    let currentWordDisplayed = false;
    let tempWordRows = []
    for (let i = 0; i < rows; i++) {
      let info = {
        word: '',
        matchInfo: [],
      }
 
      if (pastWords[i]) { 
        info = pastWords[i] 
      }

      else if (!currentWordDisplayed) { 
        info.word = currentWord; 
        currentWordDisplayed = true; 
      }

      tempWordRows.push(
        <div className="word-row" key={i}>
          {getRow(info)}
        </div>
      )
    }

    setWordRows(tempWordRows)
  }

  /* 
  Used to simulate mouse click event. 
  This is used to trigger the enter word button by clicking the 'Enter' key
  */
  const mouseClickEvents = ['mousedown', 'click', 'mouseup'];
  function simulateMouseClick(element){
    mouseClickEvents.forEach(mouseEventType =>
      element.dispatchEvent(
        new MouseEvent(mouseEventType, {
            view: window,
            bubbles: true,
            cancelable: true,
            buttons: 1
        })
      )
    );
  }

  React.useEffect(() => { // Will be only called once at the start of the game
    setAllRows();

    function inAlphabet(key) {
      return alphabet.includes(key);
    }

    document.addEventListener('keydown', function(event){
      if(document.querySelector('.confetti')) { return; } // If there is confetti = game is over, can't type new words

      if (!keysHit.has(event.key)) {
        if (inAlphabet(event.key)) {
          setCurrentWord((currentWord) => currentWord.concat(event.key).substring(0, wordLength)); // max word length
        }

        if (event.key === 'Backspace') {
          setCurrentWord((currentWord) => currentWord.slice(0, -1));
        }

        if (event.key === 'Enter') {
          var btn = document.querySelector('.submit-word-btn');
          simulateMouseClick(btn); // Trigger the button click
        }
        
        keysHit.add(event.key)
      }
    });

    document.body.addEventListener('focusin', (e) => { // Make buttons unfocusable
      if (e.target.classList.contains('__nofocus')) {
        e.relatedTarget ? e.relatedTarget.focus() : e.target.blur();
      }
    });

    document.addEventListener('keyup', (event) => {
      keysHit.delete(event.key)
    });
    
  }, [])
  
  // Update rows as words are entered
  React.useEffect(() => {
    if (wordRows[0]) { setAllRows(); }
    
  }, [currentWord, pastWords])

  // Clear error message after 3 seconds
  React.useEffect(() => {
    setTimeout(() => {
      { setErrorMessage("") }
    }, 3000)
  }, [errorMessage])

  return (
    <div className="app">
      {game === 'true' && <Confetti className="confetti" />}
      <h1 className="title">Wordle Training</h1>
      
      <div className="game-panel">
        {wordRows}
      </div>

      <h3 className="error-message">{errorMessage}</h3>

      <Keyboard keyboardKeys={keyboardKeys} setCurrentWord={setCurrentWord} wordLength={wordLength} />

      <button tabIndex="-1" className="enter-btn __nofocus" onClick={() => checkWord(currentWord)}>ENTER</button>
      <button tabIndex="-1" className="restart-btn __nofocus" onClick={() => restartGame()}>NEW GAME</button>
      <button tabIndex="-1" className="submit-word-btn __nofocus" onClick={() => checkWord(currentWord)}>Check Word</button>
    </div>
  )
}

export default App
