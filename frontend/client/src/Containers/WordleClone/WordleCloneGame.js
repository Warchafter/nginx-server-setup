import { useDispatch, useSelector } from "react-redux";
import { getRandomWord } from "features/wordleclone";

import { NavLink} from "react-router-dom";
import DefaultLayout from "hoc/Layout/DefaultLayout";

import WinScreenModal from "Components/WordleClone/WinScreenModal";

import compareTwoArrays from "hoc/compareTwoArrays";

import { useOnPressedAlphabetKey } from "hooks/onPressedAlphabetKey";
import { useOnPressedEnterGameKey } from "hooks/onPressedEnterGameKey";

import "./css/WordleCloneGame.css";
import { useState, useRef } from "react";

const WordleCloneGame = () => {

    ///    TODO:
    ///     4.- Validate that the user is typing only the letters allowed.
    ///     5.- Show a keyboard with the allowed keys.
    ///     6.- Show which keys have been used with colors:
    ///             Transparent: not used.
    ///             Grey: used and not found.
    ///             Yellow: used and found, incorrect spot.
    ///             Green: used and found, correct spot.
    ///     7.- Keep a counter of the line in which the user is typing into that
    ///         can only go up by one after the user pressed enter to submit the word.
    ///     8.- User cannot press enter if the word is shorter than the 5 letters.
    ///     9.- A seperate internal word counter needs to be kept in order for the
    ///         validation to work properly on multiple functions.
    /// the user types the word --> gets saved in typedWord state
    /// the letters are shown on the screen for current word
    /// only after user presses enter, does the word go into the stored array
    /// that includes the list of checked words for the user
    ///     11.- To handle the keyboard with all the typed letters and their colors
    ///          there can be an array of letters in the order in which they were typed
    ///          that gets checked whenever the keyboard letters are being rendered
    ///          from a preexisting array of all the alphabet letters.

    const dispatch = useDispatch();

    const { loading, randomWord, gameWord } = useSelector(state => state.wordleClone);

    const [wordGuessed, setWordGuessed] = useState(false);
    const [lastTry, setLastTry] = useState(false);
    const [lineCount, setLineCount] = useState(1);
    const [typedWord, setTypedWord] = useState([]); // Needs to be an array.
    const [typedEntries, setTypedEntries] = useState([]);
    const [errorMsg, setErrorMsg] = useState(null);

    const typedWordValidation = (event) => {
        if (wordGuessed) return
        // If the Backspace key is pressed, we remove the last element of the array
        if (event.key === "Backspace"){
            setTypedWord(prevLetters => prevLetters.slice(0, -1));
            return;
        }

        if (typedWord.length < 5) {
            // The State array is destructured to prevent mutation with the limit of
            // 5 letters.
            //! Change this later to be a variable that the user can choose to adjust difficulty
            setTypedWord((prevLetters => [...prevLetters, event.key.toUpperCase()]));
        } else {
            setErrorMsg("Word is too long!");
        }
        return;
    };

    const onSubmitWordHandler = () => {
        if (typedWord.length === 5) {
            // Check logic for correct word here
            //! Change this later to be a variable that the user can choose to adjust difficulty
            if (typedEntries.length >= 6) {
                setErrorMsg("You already lost!");
                return;
            }
            if (compareTwoArrays(typedWord, gameWord)) {
                setWordGuessed(true);
            }
            const combinedEntries = [...typedEntries, typedWord];
            setTypedEntries(combinedEntries);
            setTypedWord([]);
            if (lineCount < 6) {
                setLineCount(lineCount+1);
            }
            if (lineCount === 6) {
                setLastTry(true);
            }
        }
        if (typedWord.length > 5) {
            setErrorMsg("Word is too long!");
            return;
        } else {
            setErrorMsg("Word is too short!");
            return;
        }
    };

    const wordleRef = useRef(null);

    useOnPressedAlphabetKey(wordleRef, typedWordValidation);
    useOnPressedEnterGameKey(wordleRef, onSubmitWordHandler);

    const LetterBoxComponent = ({ letter, color }) => {
        return (
            <div className={`wordle-grid-item ${color ? color : ""}`}>
                <p className="wordle-grid-letter">{letter}</p>
            </div>
        )
    };

    const renderCurrentLineWord = (typedWord) => {
        // Render the first component with values from the array
        const currentWord = typedWord.map((item, index) => (
            <LetterBoxComponent key={index} letter={item} />
        ));

        // Render empty components to reach a total of 5
        //! Change this later to be a variable that the user can choose to adjust difficulty
        const remainingComponentsCount = Math.max(0, 5 - typedWord.length);
        for (let i = 0; i < remainingComponentsCount; i++) {
            currentWord.push(
                <div key={`empty-${i}`} className="wordle-grid-item">
                    <p className="wordle-grid-letter"></p>
                </div>
            );
        }
        return currentWord;
    };

    // Use lineCount to calculate the amount of remaining boxes to render
    const renderEmptyLineBoxes = (lineCount) => {
        const remainingEmptyLines = Math.max(0, 6 - lineCount);

        // Needs to start as an empty array to push elements inside of the for loop
        const emptyBoxes = [];

        for (let i = 0; i < remainingEmptyLines; i++) {
            for (let j = 0; j < 5; j++) {
                emptyBoxes.push(
                    <LetterBoxComponent key={`emptyBox-${j}-row-${i+lineCount}`} />
                );
            }
        }
        return emptyBoxes;
    };

    const renderTypedEntries = (typedEntries) => {
        // I need to keep a local array variable for the gameWord
        // This would look like this: ['S','T','A','T','E']
        // Whenever the function iterates over the letters, when it founds one
        // that matches in both letter and position, it will give it the color green
        // and the letter inside of the array will be replaced by an empty space ""
        // this whill allow for other duplicate letters to be considered as grey
        // if they are not found again in the gameWord array again.
        // the loop would need to be restarted as soon as a match for letter and position
        // is found, for the checks to be clean all again considering the change.

        ////////THIS CAN BE DONE WITH A COUNT OF THE LETTERS BEING KEPT IN STATE///////
        ////////AND THEN WHEN A LETTER IS FOUND, THE COUNT GOES DOWN FOR///////
        ////////STILL DOESN'T SOLVE THE ISSUE OF NOT KNOWING BEFORE IF A LETTER MATCHES///////
        return typedEntries.map((word, index) => {
            return word.map((item, index) => {
                if (gameWord[index] === item) {
                    return <LetterBoxComponent
                                key={`entriesBox-${item}-row-${index}`}
                                letter={item}
                                color={"wordle-letter-green"}
                            />
                }
                if (gameWord.includes(item)) {
                    return <LetterBoxComponent
                                key={`entriesBox-${item}-row-${index}`}
                                letter={item}
                                color={"wordle-letter-yellow"}
                            />
                } else {
                    return <LetterBoxComponent
                                key={`entriesBox-${item}-row-${index}`}
                                letter={item}
                                color={"wordle-letter-grey"}
                            />
                }
            });
        });
    };

    const getRandomWordHandler = async () => {
        dispatch(getRandomWord());
        return
    }

    return (
        <DefaultLayout>
            <div className="nav-top-header">
                <NavLink className={"nav-p-bg"} to='/wordle-clone'>Back</NavLink>
            </div>
            {wordGuessed?<WinScreenModal gameWord={gameWord} lineCount={lineCount}/>:null}
            <input
                id="wordle-input"
                ref={wordleRef}
                type="text"
                className="hidden-input"
            >
            </input>
            <div>
                {errorMsg ? <p className="nav-p-bg">{errorMsg}</p> : ""}
            </div>
            <div className="wordle-grid-container">
                {renderTypedEntries(typedEntries)}
                {!lastTry?renderCurrentLineWord(typedWord):null}
                {renderEmptyLineBoxes(lineCount)}
            </div>
            {loading ? <p style={{color: "white"}}>Loading...</p>:<p style={{color: "white"}}>{randomWord.word}</p>}
            <button onClick={getRandomWordHandler}>Get random word!</button>
        </DefaultLayout>
    );
};

export default WordleCloneGame;