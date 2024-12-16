import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import instance from '../../../../api/request.ts';
import { IBoard } from "../../../../common/interfaces/IBoard";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {validTitleRegex} from "../../../../common/utils/validation.ts";

const Boards: React.FC<IBoard> = ({ id, title, onBoardUpdated }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [boardTitle, setBoardTitle] = useState(title);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBoardTitle(e.target.value);
    };

    const handleTitleSubmit = async () => {
        if (!validTitleRegex.test(boardTitle)) {
            toast.error('Імʼя дошки може містити лише літери, цифри, пробіли, тире, крапки та нижні підкреслення.');
            return;
        }

        try {
            await instance.put(`/board/${id}`, { title: boardTitle });
            setIsEditing(false);
            toast.success('Назва дошки успішно змінена.');
            if (onBoardUpdated) {
                onBoardUpdated();
            }
        } catch {
            toast.error('Сталася помилка при редагуванні назви.');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleTitleSubmit();
        }
    };

    const handleBlur = () => {
        handleTitleSubmit();
    };

    return (
        <Link to={`/board/${id}`} style={{ textDecoration: 'none' }}>
            <div className={'board-item'}>
                <h3
                    onClick={(e) => {
                        e.preventDefault();
                        setIsEditing(true);
                    }}
                >
                    {boardTitle}
                </h3>
                <div>
                    {isEditing ? (
                        <input
                            type="text"
                            value={boardTitle}
                            onChange={handleTitleChange}
                            onKeyDown={handleKeyDown}
                            onBlur={handleBlur}
                            autoFocus
                        />
                    ) : null}
                </div>
            </div>
        </Link>
    );
};

export default Boards;
