import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import instance from '../../../../api/request.ts';
import { IBoard } from '../../../../common/interfaces/IBoard';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validTitleRegex } from '../../../../common/utils/validation.ts';
import colorImages from "../../../Board/components/Card/colorImages.ts";
import './boards.scss'

const Boards: React.FC<IBoard> = ({ id, title, custom, onBoardUpdated }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [boardTitle, setBoardTitle] = useState(title);
    const [boardBackground, setBoardBackground] = useState(custom?.color || ''); // Стан для фону

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBoardTitle(e.target.value);
    };

    const handleBackgroundSelect = async (selectedBase64: string, e: React.MouseEvent<HTMLImageElement>) => {
        console.log(selectedBase64);
        e.preventDefault();
        e.stopPropagation();
        setBoardBackground(selectedBase64);
        try {
            await instance.put(`/board/${id}`, { title: boardTitle, custom: { color: selectedBase64 } });
            toast.success('Фон дошки успішно оновлено.');
            if (onBoardUpdated) {
                onBoardUpdated();
            }
        } catch {
            toast.error('Сталася помилка при оновленні фону дошки.');
        }
    };

    const handleSubmit = async () => {
        if (!validTitleRegex.test(boardTitle)) {
            toast.error('Імʼя дошки може містити лише літери, цифри, пробіли, тире, крапки та нижні підкреслення.');
            return;
        }

        try {
            await instance.put(`/board/${id}`, { title: boardTitle, custom: { color: boardBackground } });
            toast.success('Дошку успішно оновлено.');
            setIsEditing(false);

            if (onBoardUpdated) {
                onBoardUpdated();
            }
        } catch {
            toast.error('Сталася помилка при оновленні дошки.');
        }
    };

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (isEditing) {
            e.preventDefault();
        }
    };

    return (
        <Link
            to={`/board/${id}`}
            style={{ textDecoration: 'none' }}
            onClick={handleLinkClick}
        >
            <div
                className="board-item"
                style={{ '--board-background': `url(${boardBackground})` } as React.CSSProperties}
            >
                {isEditing ? (
                    <>
                        <input
                            type="text"
                            value={boardTitle}
                            onChange={handleTitleChange}
                            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                            onBlur={handleSubmit}
                            autoFocus
                        />
                        <div className="color-picker">
                            {colorImages.map((colorItem, index) => (
                                <img
                                    key={index}
                                    src={colorItem.base64}
                                    alt={`Color ${index}`}
                                    onClick={(e) => handleBackgroundSelect(colorItem.base64, e)}/>
                            ))}
                        </div>
                    </>
                ) : (
                    <h3
                        onClick={(e) => {
                            e.preventDefault();
                            setIsEditing(true);
                        }}
                    >
                        {boardTitle}
                    </h3>
                )}
            </div>
        </Link>
    );
};

export default Boards;
