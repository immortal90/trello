import {ICard} from "./ICard";

export interface IList {
    lists: [];
    result: string;
    background: string;
    boards: [];
    id: number;
    title: string;
    cards: ICard[];
}