export default function HomePage({ apiValues, setApiValues, setStart }) {

  function handleSelections(e) {
    const { name, value } = e.target
    setApiValues(prev => (
      {
        ...prev,
        [name]: value
      }
    ))
  }

  function startQuiz(e) {
    e.preventDefault()
    
    // only start quiz if all 3 input values have been filled
    if (apiValues.difficulty && apiValues.number && apiValues.category) {
      setStart(true)
    }
  }

  return (
    <div className="homePage">
      <h1 className="title">Trivia App</h1>
      <form className="form-selections">

        <label htmlFor="difficulty">Set difficulty:</label>
        <select 
          name="difficulty" 
          id="difficulty" 
          className="input-seletors"
          value={apiValues.difficulty}
          onChange={handleSelections}
        >
          <option value="empty"></option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <label htmlFor="number">Number of questions:</label>
        <select 
          name="number" 
          id="number" 
          className="input-seletors"
          value={apiValues.number}
          onChange={handleSelections}
        >
          <option value="0"></option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>

        <label htmlFor="category">Select category:</label>
        <select 
          name="category" 
          id="category" 
          className="input-seletors"
          value={apiValues.category}
          onChange={handleSelections}
        >
          <option value="emptyCategory"></option>
          <option value="9">General Knowledge</option>
          <option value="10">Books</option>
          <option value="11">Film</option>
          <option value="12">Music</option>
          <option value="13">Musicals & Theaters</option>
        </select>

        <button 
          id="startBtn" 
          onClick={e => startQuiz(e)}
        >
          Start Quiz
        </button>

      </form>
    </div>
  )
}