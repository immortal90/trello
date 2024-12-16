import { useParams } from "react-router-dom";
import List from "./components/List/List.tsx";

const Board = () => {
    const { board_id } = useParams<{ board_id: string }>();

    if (!board_id) {
        return <p>Помилка: `board_id` не знайдено</p>;
    }

    return (
        <div>
            <List boardId={board_id} />
        </div>
    );
};

export default Board;
