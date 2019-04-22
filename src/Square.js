import React from 'react';
import './App.css';

export default function Square(props) {
    if(props.style) {
        return (
            <button 
            className={"square " + props.shade}
            onClick={props.onClick}
            >
            <img src={props.style} className="pieces" alt="logo" />
            </button>
        );
    } else {
        return (
            <button 
            className={"square " + props.shade}
            onClick={props.onClick}
            >
            </button>
        );
    }
}
