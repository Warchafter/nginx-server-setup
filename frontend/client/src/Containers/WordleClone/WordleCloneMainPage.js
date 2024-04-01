import { NavLink} from "react-router-dom";
import DefaultLayout from "hoc/Layout/DefaultLayout";

import "./css/WordleCloneMainPage.css";

const WordleCloneMainPage = () => {

    return (
        <DefaultLayout>
            <div className="wordle-mainpage-base">
                <div className="nav-top-header">
                    <NavLink className={"nav-p-bg"} to='/wordle-clone-game'>Back</NavLink>
                </div>
                <h1>This is a wordle clone</h1>
                <h3>It'll use the following tech concepts:</h3>
                <ul className="wordle-inst-list">
                    <li>DOM Traversal</li>
                    <li>Event Listeners</li>
                    <li>API of words</li>
                </ul>
                <br></br>
                <h3>How to Play</h3>
                <h4>Guess the Wordle in 6 tries - may change with diff options</h4>
                <ul  className="wordle-inst-list">
                    <li>Each guess must be a valid 5-letter word</li>
                    <li>The color of the tiles will change to show how close your guess was to the word</li>
                </ul>
                <br></br>
                <NavLink className={"nav-p-bg"} to='/wordle-clone-game'>Go to the Game!</NavLink>
            </div>
        </DefaultLayout>
    )
};

export default WordleCloneMainPage;