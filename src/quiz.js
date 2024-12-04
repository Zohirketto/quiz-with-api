import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Quiz() {
    const {categoryId} = useParams(); 
    const [questions, setQuestions] = useState([]);
    const [score, setScore] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [loading, setLoading] = useState(true);
    const [gameOver, setGameover] = useState(false);

    useEffect(() => {
        axios
            .get(`https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=easy&type=multiple`)
            .then((response) => {
                setQuestions(response.data.results);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    const changeQuestion = (elm) => {
        if (elm === questions[currentQuestion].correct_answer) {
            setScore(score + 1);
        }
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setGameover(true);
        }
    };

    if (loading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    if (questions.length === 0) {
        return <div className="text-center mt-5">No questions available!</div>;
    }

    const current = questions[currentQuestion];
    
    if (!current) {
        return <div className="text-center mt-5">Loading question...</div>;
    }

    const answers = [...current.incorrect_answers, current.correct_answer].sort();

    if (gameOver) {
        return (
            <div className="text-center mt-5">
                <h1>Game Over!</h1>
                <p>Your final score is {score} out of {questions.length}</p>
                <Link to="/" className="btn btn-primary">Restart</Link>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 text-center">
                    <h1>Quiz</h1>
                    <div className="card p-4">
                        <p className="mb-4">{current.question}</p>
                        <div className="d-grid gap-2">
                            {answers.map((elm, index) => (
                                <button
                                    key={index}
                                    className="btn btn-outline-primary mb-2"
                                    onClick={() => changeQuestion(elm)}
                                >
                                    {elm}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
