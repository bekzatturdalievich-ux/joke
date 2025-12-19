import { useState } from "react";
import "./index.css";

function App() {
  const [mode, setMode] = useState("participant"); // admin | participant
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [survey, setSurvey] = useState(null);
  const [votes, setVotes] = useState({});

  const createSurvey = () => {
    if (!question || options.some((o) => o.trim() === "")) return;
    setSurvey({ question, options });
    setVotes({});
  };

  const vote = (option) => {
    setVotes((prev) => ({
      ...prev,
      [option]: (prev[option] || 0) + 1,
    }));
  };

  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);

  return (
    <div className="app">
      <header>
        <h1>Survey System</h1>
        <div className="switch">
          <button
            className={mode === "admin" ? "active" : ""}
            onClick={() => setMode("admin")}
          >
            Admin
          </button>
          <button
            className={mode === "participant" ? "active" : ""}
            onClick={() => setMode("participant")}
          >
            Participant
          </button>
        </div>
      </header>

      <main>
        {mode === "admin" && (
          <div className="card">
            <h2>Create Survey</h2>

            <input
              type="text"
              placeholder="Survey question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />

            {options.map((opt, i) => (
              <input
                key={i}
                type="text"
                placeholder={`Option ${i + 1}`}
                value={opt}
                onChange={(e) => {
                  const copy = [...options];
                  copy[i] = e.target.value;
                  setOptions(copy);
                }}
              />
            ))}

            <button
              className="add"
              onClick={() => setOptions([...options, ""])}
            >
              + Add option
            </button>

            <button className="primary" onClick={createSurvey}>
              Create Survey
            </button>
          </div>
        )}

        {mode === "participant" && (
          <div className="card">
            {!survey ? (
              <p>No active survey</p>
            ) : (
              <>
                <h2>{survey.question}</h2>

                {survey.options.map((opt, i) => (
                  <button key={i} className="option" onClick={() => vote(opt)}>
                    {opt}
                  </button>
                ))}

                <div className="results">
                  <h3>Results</h3>
                  {survey.options.map((opt, i) => {
                    const count = votes[opt] || 0;
                    const percent = totalVotes
                      ? Math.round((count / totalVotes) * 100)
                      : 0;
                    return (
                      <div key={i} className="result">
                        <span>{opt}</span>
                        <div className="bar">
                          <div
                            className="fill"
                            style={{ width: percent + "%" }}
                          ></div>
                        </div>
                        <span>{percent}%</span>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}
      </main>

      <footer>© 2025 Survey System</footer>
    </div>
  );
}

export default App;
