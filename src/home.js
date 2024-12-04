import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const [category, setCategory] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("https://opentdb.com/api_category.php")
            .then((response) => {
                setCategory(response.data.trivia_categories);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleStartQuiz = () => {
        if (selectedIndex !== null && selectedIndex !== "") {
            navigate(`/quiz/${selectedIndex}`);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 text-center">
                    <h1 className="mb-4">Welcome au Quiz</h1>
                    <div className="mb-3">
                        <select
                            className="form-select"
                            onChange={(e) => setSelectedIndex(e.target.value)}
                        >
                            <option value="">Select a Category</option>
                            {category.map((elm) => (
                                <option key={elm.id} value={elm.id}>
                                    {elm.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={handleStartQuiz}
                    >
                        Start Quiz
                    </button>
                </div>
            </div>
        </div>
    );
}
