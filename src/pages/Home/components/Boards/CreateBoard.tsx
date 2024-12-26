import React, { useState } from 'react';
import instance from "../../../../api/request.ts";
import { toast } from 'react-toastify';
import { validTitleRegex } from "../../../../common/utils/validation.ts";
import 'react-toastify/dist/ReactToastify.css';
import './createBoard.scss';

interface CreateBoardProps {
    onBoardCreated: () => void;
}

const CreateBoard: React.FC<CreateBoardProps> = ({ onBoardCreated }) => {
    const [newBoardTitle, setNewBoardTitle] = useState('');
    const [newBoardColor, setNewBoardColor] = useState('#ffffff');

    const handleAddBoard = async () => {
        if (newBoardTitle.trim() === '') {
            toast.error('Назва дошки не може бути порожньою.');
            return;
        }

        if (!validTitleRegex.test(newBoardTitle)) {
            toast.error('Ім\'я дошки може містити лише літери, цифри, пробіли, тире, крапки та нижні підкреслення.');
            return;
        }

        try {
            const response = await instance.post('board', {
                title: newBoardTitle,
                custom: {
                    color: newBoardColor
                }
            });
            console.log('Відповідь сервера:', response);
            setNewBoardTitle('');
            setNewBoardColor('#ffffff');
            toast.success('Дошку успішно створено.');
            onBoardCreated();
        } catch (error) {
            if (error instanceof Error) {
                toast.error(`Не вдалося створити дошку. Помилка: ${error.message}`);
            } else {
                toast.error('Не вдалося створити дошку. Спробуйте ще раз.');
            }
        }
    };


    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Нова дошка</h3>
                <input
                    type="text"
                    value={newBoardTitle}
                    onChange={(e) => setNewBoardTitle(e.target.value)}
                    placeholder="Назва дошки"
                />
                <input
                    type="color"
                    value={newBoardColor}
                    onChange={(e) => setNewBoardColor(e.target.value)}
                    title="Виберіть колір для дошки"
                />
                <button onClick={handleAddBoard}>Додати</button>
                <button onClick={() => onBoardCreated()}>Закрити</button>
            </div>
        </div>
    );
};

export default CreateBoard;
