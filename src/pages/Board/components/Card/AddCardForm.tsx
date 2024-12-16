import React, { useState } from 'react';
import instance from "../../../../api/request.ts";
import { Button } from "../Button/Button.tsx";
import './addCardForm.scss';
import colorImages from "./colorImages.ts";
import {toast} from "react-toastify";

interface AddCardFormProps {
    boardId: number | undefined;
    listId: number | undefined;
    fetchBoardData: () => void;
}

const validTitleRegex = /^[a-zA-Z0-9а-яА-Яії _.-]+$/;

const AddCardForm: React.FC<AddCardFormProps> = ({ boardId, listId, fetchBoardData }) => {
    const [title, setTitle] = useState('');
    const [position, setPosition] = useState(1);
    const [description, setDescription] = useState('');
    const [custom, setCustom] = useState('');
    const [color, setColor] = useState('#ffffff');

    const handleAddCard = async () => {
        if (!title) {
            toast.error('Будь ласка, введіть заголовок картки.');
            return;
        }

        if (!validTitleRegex.test(title)) {
            toast.error('Заголовок картки може містити тільки букви, цифри, пробіли, дефіси та крапки.');
            return;
        }

        try {
            const response = await instance.post(`/board/${boardId}/card`, {
                title,
                list_id: listId,
                position,
                description,
                custom: custom ? JSON.parse(custom) : undefined,
                color,
            });

            console.log('Картка додана:', response.data);
            fetchBoardData();
            setTitle('');
            setPosition(1);
            setDescription('');
            setCustom('');
            setColor('#ffffff');
        } catch {
            toast.error('Сталася помилка при додаванні картки. Спробуйте ще раз.');
        }
    };

    return (
        <div className={'addCardForm'}>
            <h5>Додати нову картку</h5>
            <form onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label>Заголовок картки:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Введіть заголовок"
                        required
                    />
                </div>
                <div>
                    <label>Позиція:</label>
                    <input
                        type="number"
                        value={position}
                        onChange={(e) => setPosition(Number(e.target.value))}
                        placeholder="Введіть позицію"
                        min={1}
                        required
                    />
                </div>
                <div>
                    <label>Опис:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Введіть опис"
                    />
                </div>
                <div>
                    <label>Колір:</label>
                    <div className="color-options">
                        {colorImages.map((colorImage) => (
                            <button
                                key={colorImage.color}
                                className={`color-option ${color === colorImage.color ? 'selected' : ''}`}
                                style={{backgroundImage: `url(${colorImage.base64})`}}
                                onClick={() => setColor(colorImage.color)}
                                type="button"
                            />
                        ))}
                    </div>
                </div>

                <Button onClick={handleAddCard}>Додати картку</Button>
            </form>
        </div>
    );
};

export default AddCardForm;
