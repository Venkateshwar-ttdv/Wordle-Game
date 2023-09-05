import React, { useEffect } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./grid";
import Keypad from "../component/keypad";
import keys from "../constants/keys";
import swl from "sweetalert";
const Wordle = ({solution ,refresh}) => {
    const {usedKeys ,turn ,handleKeyup ,isCorrect ,currentGuess ,guesses} = useWordle(solution);

    useEffect(() => {
        window.addEventListener('keyup' ,handleKeyup);
        let p = false;
        if(isCorrect) {
            window.removeEventListener('keyup' ,handleKeyup);
            setTimeout(() => swl({
                title : "🎊✌🏻 You Win ✌🏻🎊",
                text : "Click on Play Again",
            }) ,2000);
            
            return;
        }

        if(turn > 5) {
            window.removeEventListener('keyup' ,handleKeyup)
            setTimeout(() => swl({
                title : "Oops !! next time 🙂",
                text : "Click on Play Again",
            }) ,2000);
            
            return;
        }
        
        
        return () => window.removeEventListener('keyup' ,handleKeyup);
    } ,[handleKeyup ,isCorrect ,turn])
    
    
    return (
        <div>
            <div style = {{fontWeight:"bold"}}> Current Guess : <span className="current-word"> {currentGuess} </span> </div>
            <Grid guesses = {guesses} currentGuess={currentGuess} turn={turn}/>
            <Keypad keys = {keys} usedKeys = {usedKeys} solution={solution}/>
        </div>
    );
}

export default Wordle;