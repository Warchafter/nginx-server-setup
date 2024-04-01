import { useSelector } from 'react-redux';


import "./css/CaidaCardGame.css"

const CaidaTable = () => {
    const { deck, tableCards } = useSelector(state => state.caida);


    const tableRenderer = () => {
        const renderedCards = tableCards.slice(0, 10).map((card, index) => (
            <div key={card.id} className="caida-card-gridtable-item">{card ? card.rank + ' of ' + card.suit : ''}</div>
        ));

        // If the deck has fewer than 10 cards, fill the remaining slots with empty placeholders
        const remainingSlots = Math.max(0, 10 - renderedCards.length);
        for (let i = 0; i < remainingSlots; i++) {
            renderedCards.push(<div key={'empty-' + i} className="caida-card-gridtable-item"></div>);
        }

        return renderedCards;
    }

    return (
        <div>
            <div className="caida-card-gridtable">
                {tableRenderer()}
            </div>
        </div>
    );
};


export default CaidaTable;