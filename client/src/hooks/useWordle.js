import { useState } from "react";
import swl from "sweetalert";

const useWordle = (solution) => {
    const [turn ,setTurn] = useState(0);
    const [currentGuess ,setCurrentGuess] = useState('');
    const [guesses ,setGuesses] = useState([...Array(6)]);
    const [history ,setHistory] = useState([]);
    const [isCorrect ,setIsCorrect] = useState(false);
    const [usedKeys ,setUsedKeys] = useState({});
   
    const formatGuess = () => {
        let solutionArray = [...solution];
        let formattedGuess = [...currentGuess].map((l) => {
            return {key : l , color : "grey"}
        })

        formattedGuess.forEach((l ,i) => {
            if(solution[i] == l.key) {
                formattedGuess[i].color = 'green';
                solutionArray[i] = null
            }

        })

        formattedGuess.forEach((l ,i) => {
            if(solutionArray.includes(l.key) && l.color !== 'green') {
                formattedGuess[i].color = 'yellow';
                solutionArray[solutionArray.indexOf(l.key)] = null;
            }
        })

        return formattedGuess;
    }

    const addNewGuess = (formattedGuess) => {
        if(currentGuess === solution) {
            setIsCorrect(true);
        }

        setGuesses(prev => {
            let newGuesses = [...prev];
            newGuesses[turn] = formattedGuess;
            return newGuesses;
        })

        setHistory(prev => [...prev ,currentGuess]);
        setTurn(prev => prev + 1);
        
        setUsedKeys(prevUsedKeys => {
            formattedGuess.forEach(l => {
                const currentColor = prevUsedKeys[l.key];

                if(l.color === 'green') {
                    prevUsedKeys[l.key] = 'green'
                    return;
                }

                if(l.color === 'grey' && currentColor !== ('green' || 'yellow')) {
                    prevUsedKeys[l.key] = 'grey';
                    return;
                }

                if(l.color === 'grey' && currentColor !== ('green' || 'yellow')) {
                    prevUsedKeys[l.key] = 'grey';
                    return;
                }
            })
            
            return prevUsedKeys;
        })
        setCurrentGuess('');


    }

    const handleKeyup = ({key}) => {
      
        if(key == 'Enter') {
            if(turn > 5) {
                console.log("you used all your guess");
                return;
            }

            if(history.includes(currentGuess)) {
                swl({title : "You already tried this word" ,icon : "info"});
                return;
            }

            if(currentGuess.length !== 5) {
                swl({title : "Word must be of length - 5" ,icon : "info"});
                console.log("word must be of 5");
                return;
            }

            const formatted = formatGuess();
            addNewGuess(formatted);
            console.log("formatted : " ,formatted);
        }

        if(key == 'Backspace') {
            setCurrentGuess(prev => prev.slice(0 ,-1));
            return;
        } 
        
        if(/^[A-Za-z]$/.test(key)) {
            if(currentGuess.length < 5) {
                setCurrentGuess(prev => prev + key);
            }
        }
    }

    return {usedKeys ,turn ,handleKeyup ,isCorrect ,currentGuess ,guesses ,}
}

export default useWordle;