import DefaultLayout from "hoc/Layout/DefaultLayout";
import "./css/CaidaCardGame.css";

import CaidaPlayerIcon from 'Components/CaidaCardGame/CaidaPlayerIcon';
import CaidaDeck from "Containers/CaidaCardGame/CaidaDeck";
import CaidaTable from "Containers/CaidaCardGame/CaidaTable";
import CaidaOptionModal from "Components/CaidaCardGame/CaidaOptionModal";
import CaidaTeamsPoints from "Containers/CaidaCardGame/CaidaTeamsPoints";
import CaidaMatchPlayerOptionModal from "Components/CaidaCardGame/CaidaMatchPlayerOptionModal";

const CaidaCardGame = () => {
    /// Random things to do:
    /// 1.- Display front card for player and backcard for others.
    /// 2.- Keep counter of cards for each individual player.
    /// 3.- Make array of cards for the table.
    /// 4.- Make function of starting game, which generates the array of cards
    ///     and then shuffles the cards. Give option of server player to shuffle
    ///     the cards again.
    /// 5.- Make small modal of buttons for actions for each player:
    ///     a.- Shuffle the cards.
    ///     b1.- Serve the cards --> Choose 1 or 4 for first serve
    ///     b2.- Choose 1 or 4 for first serve --> Serve the cards
    ///     c.- Caida (only if previous player played a card on the table).
    ///     d.- Cantos (only in the beggining of the serve for each round).
    ///     e.-
    /// 6.- Make function to roll a dice to pick which player serves first.
    /// 7.- The order of the player goes counter-clockwise, make function to keep
    ///     keep track of the current player's turn (something like a +1 and when
    ///     it reaches 4 or something it goes back to one)
    /// 8.- Make counter for points accumulated for each player/team
    /// 9.- Make counter for cards accumulated for each player/team
    /// 10.-Possibly remake the cards/deck generation function to give each card
    ///     a unique ID to better keep track of things.
    /// 11.-Make a function that keeps tracks of the state of the table, to be
    ///     used everytime a person does a Caida and see if he cleans the table.
    /// 12.-Make function to check if when serving, the player does not hit any
    ///     of the number chosen when first serving, the first player to play
    ///     gets a point.
    /// 13.-

    ///
    /// it could be fed in a ring like way, center first and then outer ring
    ///    [X][X][X][X]         [E][F][G][H]
    ///    [X][C][C][X]   --->  [I][A][B][J]
    ///    [X][C][C][X]         [K][C][D][L]
    ///    [x][x][x][x]         [M][N][O][P]
    ///
    ///
    ///     [as][2][3][4][5]
    ///     [6][7][10][11][12] This is a simpler option, albeit uglier one.
    ///                        Potentially have another 'temporary slot' for the
    ///                        players to see the card currently being played

    /// 13.-Make a pick a player name modal, and after picking it, it will choose
    ///     the other 3 players' names.
    /// 14.-For now, make it so 4 people have to play at any given time. Split
    ///     into 2 teams on opposite sides. Maybe render players in a hardcoded
    ///     way like this:
    ///         ->initialState.teamsData[0][0] = player 1 {Human Player}
    ///         ->initialState.teamsData[1][0] = player 2
    ///         ->initialState.teamsData[0][1] = player 3
    ///         ->initialState.teamsData[1][1] = player 4

    /// 15.-In the future, when 3 way play is detected, team assigning will be
    ///     done seperately for 3 teams of 1 player each, instead of 2 of 2.
    /// 16.-Make an instructions page with the information contained within this
    ///     blogpost: https://aprendeajugarcaida.blogspot.com/2015/03/caida-un-juego-de-azar-y-habilidad.html
    /// 17.-For the future, when multiple real players are playing, have a flag for each player in
    ///     an array that each player can toggle, to determine if everyone is ready to move on to the
    ///     next round, plus a timer that automatically moves you to the next round.
    /// 18.-Potentially have a timer for each player's turn, so the game keeps moving. Algo a pause
    ///     button when needed. Pause botton could also have it's own timer.


    return (
        <DefaultLayout>
            <div className="caida-main-wrapper">
                <div className="caida-main-title"><h1>Caida Card Game</h1></div>
                <CaidaDeck />
                <div className="caida-main-content">
                <div className="caida-main-content__left">
                    <div className="caida-history-sidebar-wrapper">
                        <div className="caida-history-sidebar">
                        </div>
                    </div>
                </div>
                <div className="caida-main-content__right">
                    <div className="caida-main-content__right__top">
                        <CaidaTeamsPoints />
                    </div>
                    <div className="caida-main-content__right__middle">
                        <div className="caida-main-gamearea">
                            <div className="caida-player-grid player-item1">
                                <div className="caida-grid-player-item">
                                    <CaidaPlayerIcon playerNumber={1}/>
                                </div>
                                <div className="caida-grid-player-item">
                                    <CaidaPlayerIcon playerNumber={2}/>
                                </div>
                            </div>
                            <CaidaTable />
                            <div className="caida-player-grid player-item1">
                                <div className="caida-grid-player-item">
                                    <CaidaPlayerIcon playerNumber={3}/>
                                </div>
                                <div className="caida-grid-player-item">
                                    <CaidaPlayerIcon playerNumber={4}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="caida-main-content__right__bottom">
                        <CaidaMatchPlayerOptionModal />
                    </div>
                </div>
                </div>
                <div>
                    <CaidaOptionModal />
                </div>
            </div>
        </DefaultLayout>
    );
};

export default CaidaCardGame;