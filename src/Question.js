import React, { useEffect, useState } from "react"

import he from "he"

export default function Question(props) {
    const { question, answers, id, setQuestions, isRevealed } = props

    function setChoosen(id_ans) {
        if (!isRevealed) setQuestions(prevQuestions => {
            return prevQuestions.map(question => {
                return id === question.id ? (
                {
                    ...question, 
                    answers: (
                        question.answers.map(answer => {
                            return id_ans === answer.id ? (
                                {...answer, isChoosen: !answer.isChoosen}
                            ) :
                            {...answer, isChoosen: false}
                        })
                    )
                }
                ) : question
            })
        })
    }

    function setAnswerStyle(answer) {
        let style = ''
        if (isRevealed) {
            if (answer.isChoosen && !answer.isCorrect) style = 'question-answer-wrong'
            else if (answer.isCorrect) style = 'question-answer-correct'
            else style = 'question-answered'
        } else {
            if (answer.isChoosen) style = 'question-answer-choosen'
        }
        return style
    }

    return (
        <div className="question-container">
            <h2>{he.decode(question)}</h2>
            <div className="question-answers">
                {answers.map(answer => {
                    return (
                        <div 
                            className={`question-answer ${setAnswerStyle(answer)}`}
                            onClick={() => setChoosen(answer.id)} 
                        >
                            {he.decode(answer.text)}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
