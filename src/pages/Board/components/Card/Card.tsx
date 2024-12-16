import React, { useState } from 'react';
import { ICard } from '../../../../common/interfaces/ICard';
import instance from '../../../../api/request.ts';
import colorImages from "./colorImages.ts";
import { toast } from 'react-toastify';
import './card.scss';

interface CardProps {
    card: ICard;
    fetchBoardData: () => void;
    boardId: string;
    listId: number;
}

const validTitleRegex = /^[a-zA-Z0-9а-яА-Яії _.-]+$/;

const Card: React.FC<CardProps> = ({ card, fetchBoardData, boardId, listId }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [newTitle, setNewTitle] = useState<string>(card.title);
    const [newDescription, setNewDescription] = useState<string>(card.description);
    const [newColor, setNewColor] = useState<string>(card.color);
    const [error, setError] = useState<string | null>(null);
    const [progress, setProgress] = useState<number>(0); // Динамічний прогрес

    const incrementProgress = () => {
        if (progress < 100) {
            setProgress((prev) => prev + 10);
        }
    };

    const getBase64ByColor = (color: string): string | null => {
        const colorImage = colorImages.find((img) => img.color === color);
        return colorImage ? colorImage.base64 : null;
    };

    const handleSaveCard = async () => {
        if (!validTitleRegex.test(newTitle)) {
            toast.error('Заголовок картки містить недопустимі символи.');
            return;
        }

        try {
            await instance.put(`/board/${boardId}/card/${card.id}`, {
                title: newTitle,
                description: newDescription,
                color: newColor,
                list_id: listId,
            });
            setIsEditing(false);
            setError(null);
            fetchBoardData();
        } catch {
            toast.error('Сталася помилка при збереженні картки.');
        }
    };

    return (
        <div
            className="card"
            style={{
                backgroundImage: `url(${getBase64ByColor(newColor)})`,
                backgroundSize: 'cover',
            }}
        >
            <div className="progress-bar">
                <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>

            {isEditing ? (
                <div className="card-edit">
                    {error && <p className="error-message">{error}</p>}
                    <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="Заголовок картки"
                    />
                    <textarea
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        placeholder="Опис картки"
                    />
                    <div className="color-picker">
                        <label>Колір:</label>
                        <div className="color-options">
                            {colorImages.map((img) => (
                                <button
                                    key={img.color}
                                    style={{
                                        backgroundColor: img.color,
                                        border: newColor === img.color ? '2px solid black' : 'none',
                                    }}
                                    onClick={() => setNewColor(img.color)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="card-edit-buttons">
                        <button onClick={handleSaveCard}>Зберегти</button>
                        <button onClick={() => setIsEditing(false)}>Скасувати</button>
                    </div>
                </div>
            ) : (
                <div className="card-view" onClick={() => setIsEditing(true)}>
                    <h5>{card.title}</h5>
                    <p>{card.description}</p>
                </div>
            )}
            <button onClick={incrementProgress}>Збільшити прогрес</button>
        </div>
    );
};

export default Card;
