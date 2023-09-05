import React ,{useEffect ,useState ,useContext} from "react";
import Wordle from "./component/wordle.js";

function App() {
  const [solution ,setSolution] = useState(null);
  useEffect(() => {
    console.log("start");
    fetch("http://localhost:8080/words")
    .then(res => res.json())
    .then(json => {
      const random = json.solutions[Math.floor(Math.random()*json.solutions.length)]
      setSolution(random.word);
      
    })
  } ,[setSolution])
  
  console.log(solution);
  return (
    <div className="App">
      <h1 className="main-heading"> Wordle </h1>
      {solution && <Wordle solution = {solution}/>}
      <button className="refresh" onClick={() => window.location.reload()}> Play Again </button>
    </div>
  );
}

export default App;
