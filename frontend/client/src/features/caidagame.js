import { createSlice } from '@reduxjs/toolkit';

export const initializeDeck = () => async (dispatch) => {
    const newDeck = [];
    let counter = 0;
    suits.forEach(suit => {
        ranks.forEach(rank => {
            newDeck.push({ suit, rank, id: counter++ });
        });
    });
    dispatch(setDeck(newDeck));
};

export const shuffleDeck = () => async (dispatch, getState) => {
    const { deck } = getState().caida; // Get the current deck from the Redux state
    const shuffledDeck = [...deck]; // Create a copy of the deck to shuffle
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }
    dispatch(setDeck(shuffledDeck));
}

const initialState = {
    deck: [],
    playersCards: [],
    tableCards: [],
    startOfRoundFlag: true,
    startServeNumberOption: null,
    teamsData: [], // teamName, teamPlayers -> teamPlayerCards, teamCardsCollected,
    temporaryPoints: 0,
    playerLobbyAmountChosen: null,
};

const suits = ['Coins', 'Cups', 'Swords', 'Clubs'];
const ranks = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12];

const caidaSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setDeck: (state, action) => {
            // this holds the deck throughout the match. Functions like initializeDeck
            // and shuffleDeck use this function.
            state.deck = action.payload;
        },
        setTableCards: (state, action) => {
            // This holds the cards currently being played on the table.
            state.tableCards = action.payload;
        },
        toogleStartOfRoundFlag: state => {
            // This will control which options the server will see when serving
            // the cards in the beginning of the round and throughout the game.
            state.startOfRoundFlag = !state.startOfRoundFlag;
        },
        setStartServeNumberOption: (state, action) => {
            // This will decide the order for granting players points when serving
            // cards on the beginning of the round. 1=1,2,3,4 4=4,3,2,1
            state.startServeNumberOption = action.payload;
        },
        setPlayerLobbyAmountChosen: (state, action) => {
            // This will work with a modal where the player will be able to choose
            // between 2, 3 & 4 players.
            state.playerLobbyAmountChosen = action.payload;
        }
    },
});

export const { setDeck, setTableCards, toogleStartOfRoundFlag,
    setStartServeNumberOption, setPlayerLobbyAmountChosen } = caidaSlice.actions;
export default caidaSlice.reducer;