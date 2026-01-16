import React, { useEffect, useState } from "react"

import Question from "./Question"

import blob from "./images/blob.svg"

export default function App() {
    const [questions, setQuestions] = useState([])
    const [isReady, setIsReady] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isRevealed, setIsRevealed] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [difficulty, setDifficulty] = useState("easy")

    useEffect(() => {
        if (isReady) resetGame()
    }, [isReady])

    useEffect(() => {
        if (errorMessage) {
            alert(errorMessage)
        }
    }, [errorMessage])

    const questionElements = questions.map(question => {
        return (
            <Question 
                id={question.id}
                question={question.question}
                answers={question.answers}
                setQuestions={setQuestions}
                isRevealed={isRevealed}
            />
        )
    })

    const allChoosen =
        questions.every(question => question.answers
            .some(answer => answer.isChoosen))

    const correctAnswers = questions.filter(question => (
        question.answers.some(answer => (
            answer.isChoosen && answer.isCorrect
        ))
    )).length

    function revealCorrects() {
        if (allChoosen) setIsRevealed(true)
    }

    function resetGame() {
        setIsLoading(true)

        fetch(`https://opentdb.com/api.php?amount=5&difficulty=${difficulty}`)
            .then(res => res.json())
            .then(data => {
                setQuestions(() => {
                    const { results } = data
                    return results.map((result, index) => ({
                        id: index,
                        question: result.question,
                        answers: (
                            shuffle(result.incorrect_answers
                                .map(incorrect => ({text: incorrect, isCorrect: false}))
                                .concat({text: result.correct_answer, isCorrect: true}))
                                .map((answer, i) => ({id: i, ...answer, isChoosen: false}))
                        )
                    }))
                })
                setIsLoading(false)
                setIsRevealed(false)
            })
            .catch(() => {
                setErrorMessage("Unable to fetch questions. Verify your connection and try again");
                })
    }

    function shuffle(arr) {
        return arr
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
    }

    function handleChange(event) {
        const { value } = event.target

        setDifficulty(value)
    }

    function keyDown(e) {
        if (e.key !== 'Enter') return
        console.log([...e.target.children][0])

        const label = [...e.target.children][0]
        const value = label.htmlFor

        const newDifficult = { target: { value } }

        handleChange(newDifficult)
        
    }
   
    return (
        <>
            <div className="blob-container">
                <img className="blob blob-yellow" src={blob} alt="blob" />
                <img className="blob blob-blue" src={blob} alt="blob" />
            </div>
            <main>
                { !isReady ?
                    <>
                        <header className="title-container">
                            <h1 className="tittle">Quizzical</h1>
                            <p>Choose the right answers!</p>
                        </header>
                        <div className="difficulty-container">
                            <h2>Difficulty</h2>
                            <div className="difficulty-buttons-wrapper">
                                <input 
                                    type="radio" 
                                    className="difficulty-radio" 
                                    name="difficulty" 
                                    id="easy" 
                                    value="easy"
                                    checked={difficulty === 'easy'}
                                    onChange={handleChange}
                                />
                                <input 
                                    type="radio" 
                                    className="difficulty-radio" 
                                    name="difficulty" 
                                    id="medium" 
                                    value="medium"
                                    checked={difficulty === 'medium'}
                                    onChange={handleChange}
                                />
                                <input 
                                    type="radio" 
                                    className="difficulty-radio" 
                                    name="difficulty" 
                                    id="hard" 
                                    value="hard"
                                    checked={difficulty === 'hard'}
                                    onChange={handleChange}
                                />

                                <button className={`bttn small ${difficulty === 'easy' ? 'active' : ''}`} onKeyUp={keyDown}>
                                    <label className="difficulty-label" htmlFor="easy">Easy</label>
                                </button>
                                <button className={`bttn small ${difficulty === 'medium' ? 'active' : ''}`} onKeyUp={keyDown}>
                                    <label className="difficulty-label" htmlFor="medium">Medium</label>
                                </button>
                                <button className={`bttn small ${difficulty === 'hard' ? 'active' : ''}`} onKeyUp={keyDown}>
                                    <label className="difficulty-label" htmlFor="hard">Hard</label>
                                </button>
                            </div>

                        </div>
                        <button 
                            className="bttn"
                            onClick={() => setIsReady(true)}
                        >
                            Start Quiz
                        </button>
                    </> :
                    (
                        isLoading ?
                        <>
                            <h2>Loading</h2>
                            <div className="spinner-container">
                                <div className="loading-spinner"></div>
                            </div>
                        </> :
                        <>
                            <div className="questions-container">
                                {questionElements}
                            </div>
                            <div className="check-container">
                                {isRevealed ? <h3>You score {correctAnswers}/5 correct answers</h3> : ''}
                                <button
                                    className={`bttn ${!allChoosen ? 'bttn-locked' : ''}`}
                                    onClick={!isRevealed ? revealCorrects : resetGame}
                                >
                                    {!isRevealed ? 'Check answers' : 'Play again'}
                                </button>
                            </div>
                        </>
                    )
                }
            </main>
        </>
    )
}
