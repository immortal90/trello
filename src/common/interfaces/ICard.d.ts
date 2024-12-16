export interface ICard {
    id: ID
    title: string
    description: string
    color: string
    custom: never
    users: ID[]
    created_at: timestamp
    list_id: number;
    board_id: number;
}
