import "./App.css";
import Board from "./components/Board";
import Square from "./components/Square";

function App() {
  return (
    <>
      <Board onPlay={() => {}} squares={[]} xIsNext={true} />
    </>
  );
}

export default App;
