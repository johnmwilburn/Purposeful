import { useStorage } from "@plasmohq/storage/hook";
import { useEffect } from "react";

function Timer () { 

    const [timerSeconds, setTimerSeconds] = useStorage("timerSeconds");
    
    const getTimeDisplayString = () => {
        let timerMinutes = Math.floor(timerSeconds / 60).toString().padStart(2, "0");
        let timerSecondsDisplay = (timerSeconds % 60).toString().padStart(2, "0");
        let timerDisplay = timerMinutes + ":" + timerSecondsDisplay;
        return timerDisplay; 
    }
      
    let TimerDisplay = getTimeDisplayString();
    useEffect(() => {TimerDisplay = getTimeDisplayString()}, [timerSeconds]);
  
    return (
        <div className="timer">
            {TimerDisplay}
        </div>
    )
}

export default Timer