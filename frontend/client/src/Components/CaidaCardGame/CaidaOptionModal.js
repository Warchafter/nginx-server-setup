import { useDispatch, useSelector } from 'react-redux';
import { setPlayerLobbyAmountChosen } from 'features/caidagame';

import "./css/CaidaOptionModal.css";

const CaidaLobbyPlayerOptionModal = () => {
    const dispatch = useDispatch();

    const { playerLobbyAmountChosen } = useSelector(state => state.caida);

    const playerLobbyOptionHandler = (e) => {
        e.preventDefault();
        dispatch(setPlayerLobbyAmountChosen(e.target.value));
    }

    return (
        <div className="caidaOptionModal-backgroundpattern caidaOptionModal-wrapper">
            <div className="caidaOptionModal-title">
                <h2>
                    Choose player lobby count:
                </h2>
            </div>
            <h4>
                {playerLobbyAmountChosen}
            </h4>
            <div className="caidaOptionModal-button-row">
                <button
                    className="button-13 caidaOptionModal-btn"
                    value={2}
                    onClick={(e) => playerLobbyOptionHandler(e)}
                >
                    2 Players
                </button>
            </div>
        </div>
    );
};

export default CaidaLobbyPlayerOptionModal;