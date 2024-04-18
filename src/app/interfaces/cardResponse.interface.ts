import { CardInterface } from "./card.interface";

export interface CardResponse {
    success: boolean;
    cards: CardInterface[];
}