import { useNavigate } from 'react-router-dom';
import './youReady.scss'

const YouReady = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/board');
    };

    return (
        <div className="you-ready-container">
            <button className="you-ready-button" onClick={handleClick} aria-label="Go to board">
                YOU READY?
            </button>
        </div>
    );
};

export default YouReady;
