import React, {useEffect, useRef, useState} from 'react';
import Boards from './components/Boards/Boards';
import './home.scss';
import { Button } from "../Board/components/Button/Button.tsx";
import { IList } from "../../common/interfaces/IList";
import instance from "../../api/request.ts";
import CreateBoard from './components/Boards/CreateBoard.tsx';
import { toast } from 'react-toastify';

const Home: React.FC = () => {
    const [boards, setBoards] = useState<IList[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const isFirstLoad = useRef(true);

    const fetchBoards = async (showSuccessMessage = true) => {
        setIsLoading(true);
        try {
            const response = await instance.get<IList, IList>('board');
            setBoards(response.boards);

            if (showSuccessMessage && isFirstLoad.current) {
                toast.success('Дошки успішно завантажені!');
                isFirstLoad.current = false;
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(`Помилка завантаження дошок: ${error.message}`);
            } else {
                toast.error('Невідома помилка');
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBoards(true);
    }, []);

    const handleBoardUpdated = () => {
        fetchBoards(false);
    };

    return (
        <>
            <div className="home-container">
                {isLoading ? (
                    <p>Завантаження...</p> // Показуємо текст під час завантаження
                ) : Array.isArray(boards) && boards.length > 0 ? (
                    boards.map(board => (
                        <div key={board.id} className="board">
                            <Boards
                                id={board.id}
                                title={board.title}
                                background={board.background}
                                cards={board.cards}
                                onBoardUpdated={handleBoardUpdated}
                            />
                        </div>
                    ))
                ) : (
                    <p>Немає доступних дошок.</p>
                )}
            </div>
            <Button onClick={() => setShowModal(true)}>Додати нову дошку</Button>

            {showModal && (
                <CreateBoard onBoardCreated={() => {
                    setShowModal(false);
                    fetchBoards();
                }} />
            )}
        </>
    );
};

export default Home;
