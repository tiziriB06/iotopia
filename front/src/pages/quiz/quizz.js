import React, { useState } from 'react';
import data from '../../components/data.json';
import './quiz.css';
import idea from "../../img/idea.png";
import { useNavigate } from 'react-router-dom';

const Quizz = () => {
    const [reponse, setReponse] = useState('');
    const questions = data;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const currentQuestion = questions[currentQuestionIndex];
    const [showHint, setShowHint] = useState(false);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
    const [isHintButtonClicked, setIsHintButtonClicked] = useState(false);

    const handleSubmit = () => {
        const correctAnswer = currentQuestion.correctAnswer;

        switch (currentQuestion.type) {
            case 'qcm':
                setIsAnswerCorrect(reponse === correctAnswer);
                break;

            case 'vrai faux':
                setIsAnswerCorrect(reponse === correctAnswer);
                break;

            case 'libre':
                if (reponse.trim() === "") {
                    alert("Veuillez saisir une réponse.");
                    return;
                }
                setIsAnswerCorrect(reponse.trim() === correctAnswer);
                break;

            default:
                alert("Type de question non identifié.");
        }
    };

    const toggleHint = () => {
        setShowHint(!showHint);
        setIsHintButtonClicked(true);
        setTimeout(() => setIsHintButtonClicked(false), 500);
    };

    const handleInputChange = (e) => {
        const textarea = e.target;
        setReponse(textarea.value);
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
    };

    const nextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setReponse('');
            setIsAnswerCorrect(null);
            setShowHint(false);
        }
    };

    const prevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setIsAnswerCorrect(null);
            setShowHint(false);
        }
    };
    const typeQuest = () => {
        switch (currentQuestion.type) {
            case 'qcm':
                return (
                    <div className="qcm-cont">
                        {currentQuestion.reponses.map((option, index) => (
                            <button
                                key={index}
                                className={`qcm-butt ${isAnswerCorrect !== null && reponse === option ? isAnswerCorrect ? 'correct' : 'incorrect' : ''}`}
                                onClick={() => {
                                    setReponse(option);
                                    handleSubmit();
                                }}
                            >
                                {option}
                            </button>
                        ))}
                        {isAnswerCorrect !== null && (
                            <p className={isAnswerCorrect ? 'correct-message' : 'incorrect-message'}>
                                {isAnswerCorrect ? "Bravo, c'est correct !" : "Désolé, c'est incorrect."}
                            </p>
                        )}
                    </div>
                );

            case 'vrai faux':
                return (
                    <div className="vf-cont">
                        <div className="vf-buttons">
                            <button
                                className={`vf-butt ${isAnswerCorrect !== null && reponse === 'vrai'
                                    ? isAnswerCorrect ? 'correct' : 'incorrect'
                                    : ''
                                    }`}
                                onClick={() => {
                                    setReponse('vrai');
                                    handleSubmit();
                                }}
                            >
                                Vrai
                            </button>
                            <button
                                className={`vf-butt ${isAnswerCorrect !== null && reponse === 'faux'
                                    ? isAnswerCorrect ? 'correct' : 'incorrect'
                                    : ''
                                    }`}
                                onClick={() => {
                                    setReponse('faux');
                                    handleSubmit();
                                }}
                            >
                                Faux
                            </button>
                        </div>
                        {isAnswerCorrect !== null && (
                            <p className={isAnswerCorrect ? 'correct-message' : 'incorrect-message'}>
                                {isAnswerCorrect ? "Bravo, c'est correct !" : "Désolé, c'est incorrect."}
                            </p>
                        )}
                    </div>
                );
            case 'libre':
                return (
                    <div className="libre-cont">
                        {currentQuestion.code && (
                            <div className="code-block">
                                <pre>
                                    <code>{currentQuestion.code}</code>
                                </pre>
                            </div>
                        )}
                        <textarea
                            placeholder="Votre réponse..."
                            value={reponse}
                            onChange={handleInputChange}
                            className="libre-textarea"
                        />
                        <button className="submit" onClick={handleSubmit}>
                            Soumettre
                        </button>
                        {isAnswerCorrect !== null && (
                            <p className={isAnswerCorrect ? 'correct-message' : 'incorrect-message'}>
                                {isAnswerCorrect ? "Bravo, c'est correct !" : "Désolé, c'est incorrect."}
                            </p>
                        )}
                    </div>
                );

            default:
                return <p>Type de question non identifié</p>;
        }
    };

    const navigate = useNavigate();

    return (
        <div className="question-cont">

            <div className="sect">
                Section : {currentQuestion.section}
            </div>

            <div className="nombre-qst">
                Question {currentQuestionIndex + 1}
            </div>

            <div className="trait-cont">
                {questions.map((_, index) => (
                    <div
                        key={index}
                        className={`trait ${currentQuestionIndex === index ? 'active' : ''}`}
                    ></div>
                ))}
            </div>

            <h3>{currentQuestion.question}</h3>

            <div className="ampoule">
                <button
                    className="hint-button"
                    onClick={toggleHint}
                >
                    <img
                        src={idea}
                        alt="Indice"
                        className={`idea ${isHintButtonClicked ? 'clicked' : ''}`}
                    />
                </button>
                {showHint && <p className="hint-text">{currentQuestion.hint}</p>}
            </div>

            {typeQuest()}

            <div className="navigation-buttons">
                <button
                    className="previous"
                    onClick={prevQuestion}
                    disabled={currentQuestionIndex === 0}
                >
                    {"<< PREC"}
                </button>


                {currentQuestionIndex < questions.length - 1 && (
                    <button
                        className="next"
                        onClick={nextQuestion}
                    >
                        {"SUIVANT>>"}
                    </button>
                )}


                <button
                    className="terminer"
                    onClick={() => navigate('/win')}
                    disabled={currentQuestionIndex !== questions.length - 1}
                >
                    Terminer
                </button>
            </div>
        </div>
    );
};

export default Quizz;