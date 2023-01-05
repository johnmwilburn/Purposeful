import { useStorage } from "@plasmohq/storage/hook";
import { useEffect } from "react";

import IconButton from '@mui/material/IconButton';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RefreshIcon from '@mui/icons-material/Refresh';

function TimerControls () {

    const [timerSeconds, setTimerSeconds] = useStorage("timerSeconds", (v) => v === undefined ? 3600: v);
    const [defaultTimerSeconds, setDefaultTimerSeconds] = useStorage("defaultTimerSeconds", (v) => v === undefined ? 3600: v);
    const [timerState, setTimerState] = useStorage("timerState", (v) => v === undefined ? "stopped": v);

    let PlayOrPauseIcon = timerState === "running" ? <PauseIcon fontSize="small"/> : <PlayArrowIcon fontSize="small"/>;

    useEffect(() => {
        PlayOrPauseIcon = timerState === "running" ? <PauseIcon fontSize="small"/> : <PlayArrowIcon fontSize="small"/>;
    }, [timerState]);

    return(
        <div className="timer-controls">
            <IconButton aria-label="Pause / Unpause" size="small" onClick={() => setTimerState(timerState === "running" ? "stopped" : "running")} >
                {PlayOrPauseIcon}
            </IconButton>
            <IconButton aria-label="Reset timer" size="small" onClick={() => setTimerSeconds(defaultTimerSeconds)}>
                <RefreshIcon fontSize="small"/>
            </IconButton>
        </div>
    )
}

export default TimerControls
