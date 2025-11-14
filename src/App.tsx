import Alert from "./components/Alert";
import { Button } from "./components/Button";
import Navbar from "./components/Navbar";
import Radar from "./components/Radar";
import "./App.css";

function App() {
  return (
    <div>
      {/* <Alert>
        Hello <span>World</span>
      </Alert> */}
      <Navbar></Navbar>
      <Radar></Radar>
      {/* <Button></Button> */}
    </div>
  );
}

export default App;
