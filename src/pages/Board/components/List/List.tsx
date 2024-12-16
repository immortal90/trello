import React, { useEffect, useState } from "react";
import instance from "../../../../api/request.ts";
import { IList } from "../../../../common/interfaces/IList";
import { ICard } from "../../../../common/interfaces/ICard";
import AddListForm from "./AddListForm.tsx";
import Card from "../Card/Card.tsx";
import AddCardForm from "../Card/AddCardForm.tsx";
import { validateListTitle } from "../../../../common/utils/validation.ts";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './list.scss';

interface ListProps {
    boardId: string;
}

const List: React.FC<ListProps> = ({ boardId }) => {
    const [boardTitle, setBoardTitle] = useState<string>("");
    const [lists, setLists] = useState<IList[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [editingListId, setEditingListId] = useState<number | null>(null);
    const [newListTitle, setNewListTitle] = useState<string>("");
    const [boardError, setBoardError] = useState<boolean>(false);

    const fetchBoardData = async () => {
        try {
            const response = await instance.get<{ title: string, lists: IList[] }, IList>(`/board/${boardId}`);
            setBoardTitle(response.title);
            setLists(response.lists);
            setLoading(false);
            setBoardError(false);
        } catch {
            setLoading(false);
            if (!boardError) {
                setBoardError(true);
            }
        }
    };

    useEffect(() => {
        fetchBoardData();
    }, [boardId]);


    const handleAddList = async (newListTitle: string) => {
        if (!validateListTitle(newListTitle)) {
            return;
        }
        try {
            await instance.post<IList>(`/board/${boardId}/list`, {
                title: newListTitle,
                position: lists.length + 1,
            });
            fetchBoardData();
        } catch {
            toast.error("Не вдалося додати список.");
        }
    };

    const handleEditList = (listId: number, currentTitle: string) => {
        setEditingListId(listId);
        setNewListTitle(currentTitle);
    };

    const handleSaveList = async (listId: number) => {
        if (!validateListTitle(newListTitle)) {
            return;
        }
        try {
            await instance.put<IList>(`/board/${boardId}/list/${listId}`, { title: newListTitle });
            setEditingListId(null);
            setNewListTitle("");
        } catch {
            toast.error("Не вдалося зберегти список.");
        }
    };

    return (
        <div className="board-container">
            {loading ? (
                <p>Завантаження...</p>
            ) : boardError ? (
                <p className="error-message">Дошка не знайдена.</p>
            ) : (
                <>
                    <h1>{boardTitle}</h1>
                    <div className="lists-container">
                        {lists.map((list) => (
                            <div key={list.id} className="list-container">
                                {editingListId === list.id ? (
                                    <>
                                        <input
                                            type="text"
                                            value={newListTitle}
                                            onChange={(e) => setNewListTitle(e.target.value)}
                                            className="edit-input"
                                        />
                                        <button onClick={() => handleSaveList(list.id)}>Зберегти</button>
                                    </>
                                ) : (
                                    <h3 onClick={() => handleEditList(list.id, list.title)}>{list.title}</h3>
                                )}
                                {list.cards.map((card: ICard) => (
                                    <Card key={card.id}
                                          card={card}
                                          fetchBoardData={fetchBoardData}
                                          boardId={boardId}
                                          listId={list.id}/>
                                ))}
                                <AddCardForm boardId={parseInt(boardId)}
                                             listId={list.id}
                                             fetchBoardData={fetchBoardData}/>
                            </div>
                        ))}
                    </div>
                    <AddListForm onAddList={handleAddList}/>
                </>
            )}
        </div>
    );
};

export default List;
