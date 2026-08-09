import { useState } from "react";
import "./App.css";
import Desktop from "./components/Desktop";

function App() {
  const [started, setStarted] = useState(false);

  if (!started) {
    return (
      <main className="access-screen">
        <div className="access-card">
          <p className="eyebrow">PRIVATE SYSTEM</p>

          <h1>OurSpace OS</h1>

          <p className="subtitle">
            A small world built just for us.
          </p>

          <button onClick={() => setStarted(true)}>
            Enter
          </button>
        </div>
      </main>
    );
  }

  
return <Desktop />;

}

export default App;


