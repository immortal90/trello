import {ICard} from "./ICard";

export interface IBoard {
    cards: ICard[],
    id: number,
    title: string,
    background: string,
    onBoardUpdated: () => void
}