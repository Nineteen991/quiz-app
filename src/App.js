import { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid'

import HomePage from './components/HomePage'
import Quiz from './components/Quiz'
import './App.sass'

export default function App() {
  const [questions, setQuestions] = useState([])
  const [apiValues, setApiValues] = useState(
    {
      difficulty: '',
      number: '',
      category: ''
    }
  )
  const [start, setStart] = useState(false)

  function shuffleArray(array) {
    for (let i = array.length - 1; i>0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]
    }
  }

  const goFetch = async () => {
    if (apiValues.difficulty && apiValues.number && apiValues.category) {
      return await fetch(`https://opentdb.com/api.php?amount=${apiValues.number}&category=${apiValues.category}&difficulty=${apiValues.difficulty}`)
    } 
    else if (!apiValues.difficulty && apiValues.number && apiValues.category) {
      return await fetch(`https://opentdb.com/api.php?amount=${apiValues.number}&category=${apiValues.category}`)
    } 
    else if (apiValues.difficulty && apiValues.number && !apiValues.category) {
      return await fetch(`https://opentdb.com/api.php?amount=${apiValues.number}&difficulty=${apiValues.difficulty}`)
    }
    else if (!apiValues.difficulty && apiValues.number && !apiValues.category) {
      return await fetch(`https://opentdb.com/api.php?amount=${apiValues.number}`)
    }
    else {
      throw Error('You broke the goFetch function')
    }
  }

  useEffect(() => {
    // only fetch if we have at least have number of questions
    if (apiValues.number) {
      goFetch()
        .then(res => {
          if (!res.ok) {
            throw Error('Failed to fetch from open trivia db')
          }
          return res.json()
        })
        .then(data => {
          const formatedQuestions = data.results.map(question => {
            // combine answers & shuffle them
            question.incorrect_answers.push(question.correct_answer)
            shuffleArray(question.incorrect_answers)

            // for ea answer, I should probably check if they've been clicked
            const newAnswers = question.incorrect_answers.map(answer => (
              {
                answer: answer,
                isClicked: false,
                id: uuid()
              }
            ))

            // I don't need multiple answer arrays
            if(question.incorrect_answers) {
              delete question.incorrect_answers
            }

            return {
              ...question,
              answers: newAnswers,
              id: uuid()
            }
          })

          setQuestions(formatedQuestions)
        })
        .catch(error => console.error(error))
    }
  }, [apiValues])
  console.log(questions) 
  return (
    <div id="container">
      {
        !start
          ? <HomePage 
              apiValues={apiValues} 
              setApiValues={setApiValues} 
              setStart={setStart}
            />
          : <Quiz 
              questions={questions} 
              setQuestions={setQuestions}
            />
      }
    </div>
  )
}