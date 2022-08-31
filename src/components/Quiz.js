import { useState } from 'react'
import { v4 as uuid } from 'uuid'

export default function Quiz({ questions, setQuestions }) {
  const [correctCount, setCorrectCount] = useState(0)

  function toggleAnswers(q_id, a_id) {
    setQuestions(prev => {
      return prev.map(question => {
        if (question.id === q_id) {
          const newAnswers = question.answers.map(answer => (
            answer.id === a_id
              ? {...answer, isClicked: !answer.isClicked}
              : answer
          ))
          return {...question, answers: newAnswers}
        } else if (question.id !== q_id) {
          return question
        } else {
          throw Error('Ya broke the set questions part')
        }
      })
    })
  }
console.log(questions)
  const renderQuiz = questions.map(question => {
    const answers = question.answers.map(answer => (
      <button 
        className="answers" 
        key={uuid()}
        onClick={() => toggleAnswers(question.id, answer.id)}
      >
        {answer.answer}
      </button>
    ))

    return (
      <div className="question-card" key={uuid()}>
        <h2 className="question">{question.category}</h2>
        <h2 className="question">{question.question}</h2>
        <div className='answers-div'>{answers}</div>
      </div>
    )
  })
  
  return (
    <div className='quiz'>
      {renderQuiz}
    </div>
  )
}