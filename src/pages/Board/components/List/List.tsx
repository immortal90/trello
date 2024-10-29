import {ICard} from "../../../../common/interfaces/ICard";
import './list.scss'
import { Card } from '../Card/Card';
import {Button} from "../Button/Button.tsx";

export const List = ({ title, cards }: { title: string; cards: ICard[] }) => {
    return (
        <div className="list">
            <h2 className="list-title">{title}</h2>
            <ul className="cards-list">
                {cards.map((card) => (
                    <li key={card.id} className="card-item"><Card title={card.title}/></li>
                ))}
            </ul>
            <Button/>
        </div>
    );
};
