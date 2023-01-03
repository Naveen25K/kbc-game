import React from "react";
import { useState, useEffect } from "react";
import useSound from "use-sound";
import play from "./sound/play.mp3";
import correct from "./sound/correct.mp3";
import wrong from "./sound/wrong.mp3";

const QuesAns = ({
  questionData,
  setStop,
  questionNumber,
  setQuestionNumber,
}) => {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("answer");

  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);

  useEffect(() => letsPlay(), [letsPlay]);

  useEffect(() => {
    setQuestion(questionData[questionNumber - 1]);
  }, [questionData, questionNumber]);

  const delay = (duration, callBack) => {
    setTimeout(() => {
      callBack();
    }, duration);
  };

  const handleClick = (val) => {
    setSelectedAnswer(val);
    setClassName("answer active");
    delay(3000, () =>
      setClassName(val.correct ? "answer correct" : "answer wrong")
    );
    delay(6000, () => {
      if (val.correct) {
        correctAnswer();
        delay(1000, () => setQuestionNumber((prev) => prev + 1));
      } else {
        wrongAnswer();
        delay(1000, () => setStop(true));
      }
    });
  };

  return (
    <>
      <div className="question">
        <h2>{question?.question}</h2>
      </div>
      <div className="answers">
        {question?.answer.map((val, ind) => (
          <div
            key={ind}
            className={selectedAnswer === val ? className : "answer"}
            onClick={() => handleClick(val)}
          >
            {val.text}
          </div>
        ))}
      </div>
    </>
  );
};

export default QuesAns;
