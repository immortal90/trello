import { useState } from "react";
import { List } from "./components/List/List.tsx";
import { ICard } from '../../common/interfaces/ICard'
import './components/Board/board.scss'

interface IList {
    id: number;
    title: string;
    cards: ICard[];
}

export const Board = () => {
    const [title] = useState("Моя тестова дошка");
    const [lists] = useState<IList[]>([
        {
            id: 1,
            title: "Плани",
            cards: [
                { id: 1, title: "помити кота" },
                { id: 2, title: "приготувати суп" },
                { id: 3, title: "сходити в магазин" }
            ]
        },
        {
            id: 2,
            title: "В процесі",
            cards: [
                { id: 4, title: "подивитися серіал" }
            ]
        },
        {
            id: 3,
            title: "Зроблено",
            cards: [
                { id: 5, title: "зробити домашку" },
                { id: 6, title: "погуляти з собакой" }
            ]
        }
    ]);

    return (
        <div className="board-container">
            <h1 className="board-title">{title}</h1>
            <div className="lists-container">
                {lists.map((list) => (
                    <List key={list.id} title={list.title} cards={list.cards} />
                ))}
            </div>
        </div>
    );
};
