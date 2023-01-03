import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import QuesAns from "./QuesAns";
import Timer from "./Timer";
import User from "./User";
const App = () => {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("$ 0");
  const [startGame, setStartGame] = useState(false);

  const [userIn, setUserIn] = useState(false);

  let priceObj = useMemo(
    () =>
      [
        { id: 1, price: 1000 },
        { id: 2, price: 2000 },
        { id: 3, price: 3000 },
        { id: 4, price: 4000 },
        { id: 5, price: 5000 },
        { id: 6, price: 10000 },
        { id: 7, price: 20000 },
        { id: 8, price: 30000 },
        { id: 9, price: 40000 },
        { id: 10, price: 50000 },
        { id: 11, price: 60000 },
        { id: 12, price: 70000 },
        { id: 13, price: 80000 },
        { id: 14, price: 900000 },
        { id: 15, price: 100000 },
      ].reverse(),
    []
  );

  const questionData = useMemo(
    () => [
      {
        id: 1,
        question: "MS-Word is an example of _____",
        answer: [
          { text: "An operating system", correct: false },
          { text: "A processing device", correct: false },
          { text: "Application software", correct: true },
          { text: "An input device", correct: false },
        ],
      },

      {
        id: 2,
        question: "Ctrl, Shift and Alt are called .......... keys.",
        answer: [
          { text: "modifier", correct: false },
          { text: "function", correct: true },
          { text: "alphanumeric", correct: true },
          { text: "adjustment", correct: false },
        ],
      },

      {
        id: 3,
        question: "A computer cannot <Boot> if it does not have the _____",
        answer: [
          { text: "Compiler", correct: false },
          { text: "Loader", correct: false },
          { text: "Operating system", correct: true },
          { text: "Assembler", correct: false },
        ],
      },
    ],
    []
  );

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(priceObj.find((m) => m.id === questionNumber - 1).price);
  }, [priceObj, questionNumber]);

  return (
    <div className="App">
      {userIn ? (
        <>
          <div className="main">
            {!stop ? (
              <>
                <div className="timer">
                  <p>
                    <Timer setStop={setStop} questionNumber={questionNumber} />
                  </p>
                </div>

                <div className="mainContainer">
                  <QuesAns
                    questionData={questionData}
                    setStop={setStop}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                  />
                </div>
              </>
            ) : (
              <h2 className="WinningAmount">You Earned : {earned}</h2>
            )}
          </div>

          <div className="pyramid">
            <div className="graph">
              {priceObj.map((val) => {
                return (
                  <li
                    key={val.id}
                    className={val.id === questionNumber ? "active" : null}
                  >
                    <div className="number">{val.id}</div>
                    <div className="price">$ {val.price}</div>
                  </li>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <User setUserIn={setUserIn} />
      )}
    </div>
  );
};
export default App;
