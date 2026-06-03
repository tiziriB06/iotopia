import React, { useState } from 'react';
import './dashquiz.css';
import Sidebar from '../../components/Sidebar/sidebar';
import ajouter from '../../img/ajouter.png';
import supprimer from '../../img/supprimer.png';
import modifier from '../../img/modifier.png';

function Dashboard() {
    const getFormattedDate = () => {
        const options = { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' };
        return new Date().toLocaleDateString('fr-FR', options);
    };

    const sectionOptions = ["Codage", "Sécurité", "Réseau", "Capteurs"];
    const levelOptions = Array.from({ length: 10 }, (_, i) => i + 1);
    const answerTypeOptions = ["Choix multiple", "Vrai/Faux", "Réponse libre"];

    const [addSection, setAddSection] = useState('Codage');
    const [addLevel, setAddLevel] = useState('1');
    const [addQuizNumber, setAddQuizNumber] = useState('');
    const [addQuizName, setAddQuizName] = useState('');
    const [addAnswerType, setAddAnswerType] = useState('Choix multiple');
    const [addAnswer, setAddAnswer] = useState('');
    const [addDescription, setAddDescription] = useState('');
    const [addSuggestedAnswers, setAddSuggestedAnswers] = useState(['', '', '', '']);

    // States pour Supprimer un quiz
    const [delSection, setDelSection] = useState('Codage');
    const [delLevel, setDelLevel] = useState('1');
    const [delQuizNumber, setDelQuizNumber] = useState('');
    const [delQuizName, setDelQuizName] = useState('');
    const [delAnswerType, setDelAnswerType] = useState('Choix multiple');
    const [delAnswer, setDelAnswer] = useState('');
    const [delDescription, setDelDescription] = useState('');
    const [delSuggestedAnswers, setDelSuggestedAnswers] = useState(['', '', '', '']);

    // States pour Modifier un quiz
    const [modSection, setModSection] = useState('Codage');
    const [modLevel, setModLevel] = useState('1');
    const [modQuizNumber, setModQuizNumber] = useState('');
    const [modQuizName, setModQuizName] = useState('');
    const [modAnswerType, setModAnswerType] = useState('Choix multiple');
    const [modAnswer, setModAnswer] = useState('');
    const [modDescription, setModDescription] = useState('');
    const [modSuggestedAnswers, setModSuggestedAnswers] = useState(['', '', '', '']);

    // Handlers pour Ajouter un quiz
    const handleAddAnswerTypeChange = (e) => {
        const type = e.target.value;
        setAddAnswerType(type);
        if (type === 'Vrai/Faux') {
            setAddSuggestedAnswers(['Vrai', 'Faux']);
        } else if (type === 'Choix multiple') {
            setAddSuggestedAnswers(['', '', '', '']);
        } else {
            setAddSuggestedAnswers([addAnswer]);
        }
    };

    const handleAddSuggestedAnswerChange = (index, value) => {
        const newAnswers = [...addSuggestedAnswers];
        newAnswers[index] = value;
        setAddSuggestedAnswers(newAnswers);
        if (addAnswerType === 'Réponse libre') {
            setAddAnswer(value);
        }
    };

    const addNewSuggestedAnswer = () => {
        setAddSuggestedAnswers([...addSuggestedAnswers, '']);
    };

    const handleAddKeyDown = (e, index) => {
        if (e.key === 'Enter' && index === addSuggestedAnswers.length - 1) {
            addNewSuggestedAnswer();
        }
    };

    // Handlers pour Supprimer un quiz
    const handleDelAnswerTypeChange = (e) => {
        const type = e.target.value;
        setDelAnswerType(type);
        if (type === 'Vrai/Faux') {
            setDelSuggestedAnswers(['Vrai', 'Faux']);
        } else if (type === 'Choix multiple') {
            setDelSuggestedAnswers(['', '', '', '']);
        } else {
            setDelSuggestedAnswers([delAnswer]);
        }
    };

    const handleDelSuggestedAnswerChange = (index, value) => {
        const newAnswers = [...delSuggestedAnswers];
        newAnswers[index] = value;
        setDelSuggestedAnswers(newAnswers);
        if (delAnswerType === 'Réponse libre') {
            setDelAnswer(value);
        }
    };

    const addNewDelSuggestedAnswer = () => {
        setDelSuggestedAnswers([...delSuggestedAnswers, '']);
    };

    const handleDelKeyDown = (e, index) => {
        if (e.key === 'Enter' && index === delSuggestedAnswers.length - 1) {
            addNewDelSuggestedAnswer();
        }
    };

    // Handlers pour Modifier un quiz
    const handleModAnswerTypeChange = (e) => {
        const type = e.target.value;
        setModAnswerType(type);
        if (type === 'Vrai/Faux') {
            setModSuggestedAnswers(['Vrai', 'Faux']);
        } else if (type === 'Choix multiple') {
            setModSuggestedAnswers(['', '', '', '']);
        } else {
            setModSuggestedAnswers([modAnswer]);
        }
    };

    const handleModSuggestedAnswerChange = (index, value) => {
        const newAnswers = [...modSuggestedAnswers];
        newAnswers[index] = value;
        setModSuggestedAnswers(newAnswers);
        if (modAnswerType === 'Réponse libre') {
            setModAnswer(value);
        }
    };

    const addNewModSuggestedAnswer = () => {
        setModSuggestedAnswers([...modSuggestedAnswers, '']);
    };

    const handleModKeyDown = (e, index) => {
        if (e.key === 'Enter' && index === modSuggestedAnswers.length - 1) {
            addNewModSuggestedAnswer();
        }
    };

    // Fonction pour rendre un formulaire de quiz (utilisée pour les trois sections)
    const renderQuizForm = (prefix, states, handlers) => {
        return (
            <div className="quiz-rectangles-container">
                <div className="quiz-rectangle left-rectangle">
                    <div className="quiz-info">
                        <div className="quiz-field">
                            <p>Section:</p>
                            <select
                                className="quiz-input"
                                value={states.section}
                                onChange={(e) => handlers.setSection(e.target.value)}
                            >
                                {sectionOptions.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>

                        <div className="quiz-field">
                            <p>Niveau:</p>
                            <select
                                className="quiz-input"
                                value={states.level}
                                onChange={(e) => handlers.setLevel(e.target.value)}
                            >
                                {levelOptions.map(num => (
                                    <option key={num} value={num}>{num}</option>
                                ))}
                            </select>
                        </div>

                        <div className="quiz-field">
                            <p>Numéro du quiz:</p>
                            <input
                                type="text"
                                className="quiz-input"
                                value={states.quizNumber}
                                onChange={(e) => handlers.setQuizNumber(e.target.value)}
                            />
                        </div>

                        <div className="quiz-field">
                            <p>Nom du quiz:</p>
                            <input
                                type="text"
                                className="quiz-input"
                                value={states.quizName}
                                onChange={(e) => handlers.setQuizName(e.target.value)}
                            />
                        </div>

                        <div className="quiz-field">
                            <p>Type de réponse:</p>
                            <select
                                className="quiz-input"
                                value={states.answerType}
                                onChange={handlers.handleAnswerTypeChange}
                            >
                                {answerTypeOptions.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>

                        <div className="quiz-field">
                            <p>Réponse:</p>
                            <input
                                type="text"
                                className="quiz-input"
                                value={states.answer}
                                onChange={(e) => handlers.setAnswer(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="quiz-rectangle right-rectangle">
                    <div className="description-container">
                        <h3 className="description-title">Description</h3>
                        <textarea
                            className="description-textarea"
                            placeholder="Écrivez la description du quiz ici..."
                            value={states.description}
                            onChange={(e) => handlers.setDescription(e.target.value)}
                        />

                        <h3 className="suggested-answers-title">Réponse(s) suggérée(s)</h3>
                        <div className="suggested-answers-container">
                            {states.suggestedAnswers.map((answer, index) => (
                                <div key={`${prefix}-${index}`} className="suggested-answer-item">
                                    <textarea
                                        className="suggested-answer-input"
                                        value={answer}
                                        onChange={(e) => handlers.handleSuggestedAnswerChange(index, e.target.value)}
                                        onKeyDown={(e) => handlers.handleKeyDown(e, index)}
                                        placeholder={
                                            states.answerType === 'Vrai/Faux' ?
                                                '' : `Suggestion ${index + 1}`
                                        }
                                        rows={1}
                                        readOnly={states.answerType === 'Vrai/Faux'}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">Quiz</h1>
                <p className="page-date">{getFormattedDate()}</p>
            </div>

            {/* Section Ajouter un quiz */}
            <div className="new-quiz-section">
                <div className="title-container">
                    <img src={ajouter} alt="Icône ajouter" className="quiz-add-icon" />
                    <h2 className="new-quiz-title">Ajouter un nouveau quiz</h2>
                    <button className="add-quiz-button">Ajouter le quiz</button>
                </div>

                {renderQuizForm('add', {
                    section: addSection,
                    level: addLevel,
                    quizNumber: addQuizNumber,
                    quizName: addQuizName,
                    answerType: addAnswerType,
                    answer: addAnswer,
                    description: addDescription,
                    suggestedAnswers: addSuggestedAnswers
                }, {
                    setSection: setAddSection,
                    setLevel: setAddLevel,
                    setQuizNumber: setAddQuizNumber,
                    setQuizName: setAddQuizName,
                    handleAnswerTypeChange: handleAddAnswerTypeChange,
                    setAnswer: setAddAnswer,
                    setDescription: setAddDescription,
                    handleSuggestedAnswerChange: handleAddSuggestedAnswerChange,
                    handleKeyDown: handleAddKeyDown
                })}
            </div>

            {/* Section Supprimer un quiz */}
            <div className="new-quiz-section" style={{ marginTop: '50px' }}>
                <div className="title-container">
                    <img src={supprimer} alt="Icône supprimer" className="quiz-add-icon" />
                    <h2 className="new-quiz-title">Supprimer un quiz</h2>
                    <button className="delete-quiz-button">Supprimer le quiz</button>
                </div>

                {renderQuizForm('del', {
                    section: delSection,
                    level: delLevel,
                    quizNumber: delQuizNumber,
                    quizName: delQuizName,
                    answerType: delAnswerType,
                    answer: delAnswer,
                    description: delDescription,
                    suggestedAnswers: delSuggestedAnswers
                }, {
                    setSection: setDelSection,
                    setLevel: setDelLevel,
                    setQuizNumber: setDelQuizNumber,
                    setQuizName: setDelQuizName,
                    handleAnswerTypeChange: handleDelAnswerTypeChange,
                    setAnswer: setDelAnswer,
                    setDescription: setDelDescription,
                    handleSuggestedAnswerChange: handleDelSuggestedAnswerChange,
                    handleKeyDown: handleDelKeyDown
                })}
            </div>
            <Sidebar />
            {/* Section Modifier un quiz */}
            <div className="new-quiz-section" style={{ marginTop: '50px' }}>
                <div className="title-container">
                    <img src={modifier} alt="Icône modifier" className="quiz-add-icon" />
                    <h2 className="new-quiz-title">Modifier un quiz</h2>
                    <button className="modify-quiz-button">Modifier le quiz</button>
                </div>

                {renderQuizForm('mod', {
                    section: modSection,
                    level: modLevel,
                    quizNumber: modQuizNumber,
                    quizName: modQuizName,
                    answerType: modAnswerType,
                    answer: modAnswer,
                    description: modDescription,
                    suggestedAnswers: modSuggestedAnswers
                }, {
                    setSection: setModSection,
                    setLevel: setModLevel,
                    setQuizNumber: setModQuizNumber,
                    setQuizName: setModQuizName,
                    handleAnswerTypeChange: handleModAnswerTypeChange,
                    setAnswer: setModAnswer,
                    setDescription: setModDescription,
                    handleSuggestedAnswerChange: handleModSuggestedAnswerChange,
                    handleKeyDown: handleModKeyDown
                })}
            </div>
        </div>
    );
}

export default Dashboard;
