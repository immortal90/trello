import {ICard} from "./ICard";

export interface IBoard {
    cards: ICard[],
    id: number,
    title: string,
    custom?: {
        color?: string;
        description?: string;
    };
    onBoardUpdated: () => void
}