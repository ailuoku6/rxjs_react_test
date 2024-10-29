import { useSwitchMap } from "./hooks/useSwitchMap";
import { useSortIndex } from "./hooks/useSortIndex";
import "./App.css";

function App() {
  // const { value } = useSwitchMap();
  const { value } = useSortIndex();

  return (
    <>
      <div>{value}</div>
    </>
  );
}

export default App;
