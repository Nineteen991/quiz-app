import { useState } from 'react'
import { v4 as uuid } from 'uuid'

export default function Quiz(props) {
  const { questions, setQuestions, setStart, setApiValues } = props

  const [correctCount, setCorrectCount] = useState(0)
  const [renderScore, setRenderScore] = useState(false)

  // setup the quiz
  const renderQuiz = questions.map(question => {
    const answers = question.answers.map(answer => {
      // show when a button is clicked
      let classStyle = ''

      if (answer.isClicked) {
        classStyle = 'guess'
      } else if (!answer.isClicked) {
        classStyle = 'answers'
      } else {
        throw Error('ya broke the button styling')
      }

      // highlight the correct & incorrect answers
      if (renderScore && answer.answer === question.correct_answer) {
        classStyle = 'correct-answers'
      } else if (
        renderScore 
        && answer.isClicked
        && answer.answer !== question.correct_answer
        ) {
          classStyle = 'wrong-answer'
      }      

      return (
        <button 
          className={classStyle} 
          key={uuid()}
          onClick={() => toggleAnswers(question.id, answer.id)}
        >
          {answer.answer}
        </button>
      )
  })
console.log(questions)
    return (
      <div className="question-card" key={uuid()}>
        <h2 className="question">{question.category}</h2>
        <h2 className="question">{question.question}</h2>
        <div className='answers-div'>{answers}</div>
      </div>
    )
  })

  // toggle clicked answers
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
          throw Error('Ya broke the toggle answers part')
        }
      })
    })
  }

  // check your answers
  function checkAnswers(e) {
    e.preventDefault()
    questions.map(question => (
      // compare if the clicked answer matches the correct answer
      question.answers.map(answer => (
        answer.answer === question.correct_answer && answer.isClicked === true
          ? setCorrectCount(prev => prev += 1)
          : answer
      ))
    ))
    setRenderScore(true)
  }

  // reset the game
  function resetGame() {
    setApiValues(
      {
        difficulty: '',
        number: '',
        category: ''
      }
    )
    setQuestions([])
    setCorrectCount(0)
    setRenderScore(false)
    setStart(false)
  }

  return (
    <div className='quiz'>
      {renderQuiz}
      <div className='grade'>
        <button 
          id='grade-quiz' 
          onClick={e => checkAnswers(e)}
        >
          Grade Quiz
        </button>
        { renderScore && 
          <div className='score'>
            <h2>You got {correctCount} correct</h2>
            <button 
              id='try-again' 
              onClick={resetGame}
            >
              Try another quiz?
            </button>
          </div>
        }
      </div>
    </div>
  )
}