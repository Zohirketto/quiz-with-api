import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home";
import Quiz from "./quiz";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/quiz/:categoryId" element={<Quiz />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
