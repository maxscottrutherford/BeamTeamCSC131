import logo from './logo.svg';
import './App.css';
import { Demo } from './Demo';
import Navbar from "./Navbar";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Demo></Demo>
        <Navbar />
      </header>
    </div>
  );
}

export default App;
