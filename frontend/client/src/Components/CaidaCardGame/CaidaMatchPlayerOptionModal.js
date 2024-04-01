import { useDispatch, useSelector } from 'react-redux';
import { setDeck, setTableCards, toogleStartOfRoundFlag,
    setStartServeNumberOption } from 'features/caidagame';

import "./css/CaidaMatchPlayerOptionModal.css";

const CaidaMatchPlayerOptionModal = () => {
    const dispatch = useDispatch();
    const { deck, tableCards, startOfRoundFlag,
        startServeNumberOption, temporaryPoints } = useSelector(state => state.caida);


    const serveFirstFourCards = (numberServe) => {
        const firstFourCards = deck.slice(0, 4); // Get the first four cards from the deck
        dispatch(setTableCards(firstFourCards)); // Set the first four cards to the tableCards state
        dispatch(setDeck(deck.slice(4))); // Remove the first four cards from the deck
        dispatch(toogleStartOfRoundFlag()); // Toggles the flag to indicate wether the start of round is true
        dispatch(setStartServeNumberOption(numberServe)); // Indicates which number was chosen for the granting of points
                                                        // depending on the order of cards served and the matching numbers
        firstRoundServeCheck(firstFourCards, startServeNumberOption); // Handles detection of matching cards and grants points
                                                                        // accordingly.
    }

    const firstRoundServeCheck = (firstFourCards, startServeNumberOption) => {
        let pendingPoints = 0;
        let cardNumberMatchFlag = true;

        switch (startServeNumberOption) {
            case 1:
                for (let i = 0; i < 4; i++) {
                    if (firstFourCards[i].ranks === i+1) {
                        pendingPoints++;
                        cardNumberMatchFlag = false;
                    }
                }
                break;
            case 4:
                for (let i = 0; i < 4; i++) { // 4->0, 3->1, 2->2, 1->3
                    if (firstFourCards[i].ranks === 4-i) {
                        pendingPoints++;
                        cardNumberMatchFlag = false;
                }
            }
            break;
        default:
        }

        if (cardNumberMatchFlag) {

        }
    }

    return (
        <div className="caida-match-player-option__wrapper">
            <div>{temporaryPoints}</div>
            {startOfRoundFlag
            ?
                <div>
                    <button onClick={() => serveFirstFourCards(1)}>Serve 1</button>
                    <button onClick={() => serveFirstFourCards(4)}>Serve 4</button>
                </div>
            : null}
            <button onClick={() => dispatch(toogleStartOfRoundFlag())}>restart</button>
            {toogleStartOfRoundFlag}
        </div>
    );
};

export default CaidaMatchPlayerOptionModal;