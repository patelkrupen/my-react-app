import React from 'react';
import './App.css';

export default function Square(props) {
    if(props.image) {
        var elem = '';
        if(props.selected) {
            elem = 'selected';
        } else {
            elem = props.shade;
        }
        return (
            <button 
            className = {"square " + elem}
            onClick = {props.onClick}
            >
            <img src = {props.image} className="pieces" alt="logo" />
            </button>
        );
    } else {
        return (
            <button 
            className = {"square " + props.shade}
            onClick = {props.onClick}
            >
            </button>
        );
    }
}
