import { toast } from 'react-toastify';

export const validTitleRegex = /^[a-zA-Z0-9а-яА-Яії _.-]+$/;

const isValidTitle = (title: string) => validTitleRegex.test(title);

export const validateListTitle = (title: string): boolean => {
    if (!title) {
        toast.error("Будь ласка, введіть назву списку.");
        return false;
    }

    if (!isValidTitle(title)) {
        toast.error("Назва списку може містити тільки букви, цифри, пробіли, дефіси та крапки.");
        return false;
    }

    return true;
};
