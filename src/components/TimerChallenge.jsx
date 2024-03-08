import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

// let timer;
export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();
  // const [timerStarted , setTimerStarted] = useState(false);
  // const [timerExpired , setTimerExpired] = useState(false);

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    dialog.current.open();
  }

  function handleReset() {
    setTimeRemaining(targetTime * 1000);
  }
  function handleStart() {
    timer.current = setInterval(() => {
      // setTimerExpired(true);
      // dialog.current.open();
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
    // setTimerStarted(true);
  }

  function handleStop() {
    // clearTimeout(timer.current);
    dialog.current.open();
    clearTimeout(timer.current);
    // setTimerStarted(false);
  }

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remainingTime={timeRemaining}
        onRest={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        {/* {timerExpired && <p>You lost!!!</p>} */}
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <button onClick={timerIsActive ? handleStop : handleStart}>
          {timerIsActive ? "Stop" : "Start"} Challenge
        </button>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Time is running ..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}

// case where the value doesnt really impact the UI {atleast not directly}and we still need to manage it such that its not reset when the component is re-executed then we have a great use case for a ref
