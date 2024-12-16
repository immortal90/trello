import React, { useState } from "react";
import { Button } from "../Button/Button.tsx";
import { validateListTitle } from "../../../../common/utils/validation.ts";
import './addListForm.scss';

interface AddListFormProps {
    onAddList: (newListTitle: string) => void;
}

const AddListForm: React.FC<AddListFormProps> = ({ onAddList }) => {
    const [newListTitle, setNewListTitle] = useState<string>("");

    const handleAddList = () => {
        if (!validateListTitle(newListTitle)) {
            return;
        }

        onAddList(newListTitle);
        setNewListTitle("");
    };

    return (
        <div className={'addListForm'}>
            <input
                className={'input'}
                type="text"
                placeholder="Введіть назву нового списку"
                value={newListTitle}
                onChange={(e) => setNewListTitle(e.target.value)}
            />
            <div className={'button'}>
                <Button onClick={handleAddList}>Додати новий список</Button>
            </div>
        </div>
    );
};

export default AddListForm;
