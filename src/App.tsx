import { useSwitchMap } from "./hooks/useSwitchMap";
import { useSortIndex } from "./hooks/useSortIndex";
import "./App.css";

function App() {
  // const { value, start } = useSwitchMap();
  const { value, start } = useSortIndex();

  return (
    <>
      <div>{value}</div>
      <button onClick={start}>start</button>
    </>
  );
}

export default App;
