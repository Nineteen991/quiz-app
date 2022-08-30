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
    
    // only start quiz if at least the number value has been filled
    if (apiValues.number) {
      setStart(true)
    }
  }

  return (
    <div className="homePage">
      <h1 className="title">Trivia App</h1>
      <form className="form-selections">

        <label htmlFor="number">Number of questions - required</label>
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

        <label htmlFor="difficulty">Set difficulty:</label>
        <select 
          name="difficulty" 
          id="difficulty" 
          className="input-seletors"
          value={apiValues.difficulty}
          onChange={handleSelections}
        >
          <option value=""></option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <label htmlFor="category">Select category:</label>
        <select 
          name="category" 
          id="category" 
          className="input-seletors"
          value={apiValues.category}
          onChange={handleSelections}
        >
          <option value=""></option>
          <option value="9">General Knowledge</option>
          <option value="10">Books</option>
          <option value="11">Film</option>
          <option value="12">Music</option>
          <option value="13">Musicals & Theaters</option>
          <option value="14">Television</option>
          <option value="15">Video Games</option>
          <option value="16">Board Games</option>
          <option value="17">Science & Nature</option>
          <option value="18">Computers</option>
          <option value="19">Mathematics</option>
          <option value="20">Mythology</option>
          <option value="21">Sports</option>
          <option value="22">Geography</option>
          <option value="23">History</option>
          <option value="24">Politics</option>
          <option value="25">Art</option>
          <option value="26">Celebrities</option>
          <option value="27">Animals</option>
          <option value="28">Vehicles</option>
          <option value="29">Comics</option>
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