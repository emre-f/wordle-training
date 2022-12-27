import React from "react"

export default function Keyboard(props) {
    return (
        <div className="keyboard">
            <div className="keyboard-row"> 
                <span className={`key ${props.keyboardKeys.q}`}>Q</span>
                <span className={`key ${props.keyboardKeys.w}`}>W</span>
                <span className={`key ${props.keyboardKeys.e}`}>E</span>
                <span className={`key ${props.keyboardKeys.r}`}>R</span>
                <span className={`key ${props.keyboardKeys.t}`}>T</span>
                <span className={`key ${props.keyboardKeys.y}`}>Y</span>
                <span className={`key ${props.keyboardKeys.u}`}>U</span>
                <span className={`key ${props.keyboardKeys.i}`}>I</span>
                <span className={`key ${props.keyboardKeys.o}`}>O</span>
                <span className={`key ${props.keyboardKeys.p}`}>P</span>
            </div>
            <div className="keyboard-row">
                <span className={`key ${props.keyboardKeys.a}`}>A</span>
                <span className={`key ${props.keyboardKeys.s}`}>S</span>
                <span className={`key ${props.keyboardKeys.d}`}>D</span>
                <span className={`key ${props.keyboardKeys.f}`}>F</span>
                <span className={`key ${props.keyboardKeys.g}`}>G</span>
                <span className={`key ${props.keyboardKeys.h}`}>H</span>
                <span className={`key ${props.keyboardKeys.j}`}>J</span>
                <span className={`key ${props.keyboardKeys.k}`}>K</span>
                <span className={`key ${props.keyboardKeys.l}`}>L</span>
            </div>
            <div className="keyboard-row">
                <span className={`key ${props.keyboardKeys.z}`}>Z</span>
                <span className={`key ${props.keyboardKeys.x}`}>X</span>
                <span className={`key ${props.keyboardKeys.c}`}>C</span>
                <span className={`key ${props.keyboardKeys.v}`}>V</span>
                <span className={`key ${props.keyboardKeys.b}`}>B</span>
                <span className={`key ${props.keyboardKeys.n}`}>N</span>
                <span className={`key ${props.keyboardKeys.m}`}>M</span>
            </div>
        </div>
    )
}