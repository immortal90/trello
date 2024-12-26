import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Board = lazy(() => import("./pages/Board/Board.tsx"));
const Home = lazy(() => import("./pages/Home/Home.tsx"));
const YouReady = lazy(() => import("./pages/Home/YouReady.tsx"));

export default function App() {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<YouReady />} />
                    <Route path="/board" element={<Home />} />
                    <Route path="/board/:board_id" element={<Board />} />
                    <Route path="*" element={<div>Page Not Found</div>} />
                </Routes>
            </Suspense>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        </>
    );
}
