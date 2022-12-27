import React from "react"

export default function Keyboard(props) {
    function typeKey(key) {
        props.setCurrentWord((currentWord) => currentWord.concat(key).substring(0, props.wordLength)); // max word length
    }

    return (
        <div className="keyboard">
            <div className="keyboard-row"> 
                <button tabIndex="-1" className={`key ${props.keyboardKeys.q} __nofocus`} onClick={() => typeKey('q')}>Q</button>
                <button tabIndex="-1" className={`key ${props.keyboardKeys.w} __nofocus`} onClick={() => typeKey('w')}>W</button>
                <button tabIndex="-1" className={`key ${props.keyboardKeys.e} __nofocus`} onClick={() => typeKey('e')}>E</button>
                <button tabIndex="-1" className={`key ${props.keyboardKeys.r} __nofocus`} onClick={() => typeKey('r')}>R</button>
                <button tabIndex="-1" className={`key ${props.keyboardKeys.t} __nofocus`} onClick={() => typeKey('t')}>T</button>
                <button tabIndex="-1" className={`key ${props.keyboardKeys.y} __nofocus`} onClick={() => typeKey('y')}>Y</button>
                <button tabIndex="-1" className={`key ${props.keyboardKeys.u} __nofocus`} onClick={() => typeKey('u')}>U</button>
                <button tabIndex="-1" className={`key ${props.keyboardKeys.i} __nofocus`} onClick={() => typeKey('i')}>I</button>
                <button tabIndex="-1" className={`key ${props.keyboardKeys.o} __nofocus`} onClick={() => typeKey('o')}>O</button>
                <button tabIndex="-1" className={`key ${props.keyboardKeys.p} __nofocus`} onClick={() => typeKey('p')}>P</button>
            </div>
            <div className="keyboard-row">
                <button tabIndex="-1" className={`key ${props.keyboardKeys.a} __nofocus`} onClick={() => typeKey('a')}>A</button>
                <button tabIndex="-1" className={`key ${props.keyboardKeys.s} __nofocus`} onClick={() => typeKey('s')}>S</button>
                <button tabIndex="-1" className={`key ${props.keyboardKeys.d} __nofocus`} onClick={() => typeKey('d')}>D</button>
                <button tabIndex="-1" className={`key ${props.keyboardKeys.f} __nofocus`} onClick={() => typeKey('f')}>F</button>
                <button tabIndex="-1" className={`key ${props.keyboardKeys.g} __nofocus`} onClick={() => typeKey('g')}>G</button>
                <button tabIndex="-1" className={`key ${props.keyboardKeys.h} __nofocus`} onClick={() => typeKey('h')}>H</button>
                <button tabIndex="-1" className={`key ${props.keyboardKeys.j} __nofocus`} onClick={() => typeKey('j')}>J</button>
                <button tabIndex="-1" className={`key ${props.keyboardKeys.k} __nofocus`} onClick={() => typeKey('k')}>K</button>
                <button tabIndex="-1" className={`key ${props.keyboardKeys.l} __nofocus`} onClick={() => typeKey('l')}>L</button>
            </div>
            <div className="keyboard-row">
                <button tabIndex="-1" className={`key ${props.keyboardKeys.z} __nofocus`} onClick={() => typeKey('z')}>Z</button>
                <button tabIndex="-1" className={`key ${props.keyboardKeys.x} __nofocus`} onClick={() => typeKey('x')}>X</button>
                <button tabIndex="-1" className={`key ${props.keyboardKeys.c} __nofocus`} onClick={() => typeKey('c')}>C</button>
                <button tabIndex="-1" className={`key ${props.keyboardKeys.v} __nofocus`} onClick={() => typeKey('v')}>V</button>
                <button tabIndex="-1" className={`key ${props.keyboardKeys.b} __nofocus`} onClick={() => typeKey('b')}>B</button>
                <button tabIndex="-1" className={`key ${props.keyboardKeys.n} __nofocus`} onClick={() => typeKey('n')}>N</button>
                <button tabIndex="-1" className={`key ${props.keyboardKeys.m} __nofocus`} onClick={() => typeKey('m')}>M</button>
            </div>
        </div>
    )
}