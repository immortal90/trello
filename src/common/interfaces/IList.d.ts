import {ICard} from "./ICard";

export interface IList {
    lists: [];
    result: string;
    color: string;
    boards: [];
    id: number;
    title: string;
    cards: ICard[];
}