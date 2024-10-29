import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import {Board} from "./pages/Board/Board.tsx";

export default function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/board" element={<Board />} />
                </Routes>
            </div>
        </Router>
    );
}

function Home() {
    return <h2>Home</h2>;
}