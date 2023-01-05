import { useStorage } from "@plasmohq/storage/hook";
import "./popup-style.scss"

import PopupHeader from "./components/PopupHeader";
import PopupCenter from "./components/PopupCenter";
import PopupBottom from "./components/PopupBottom";

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import RefreshIcon from '@mui/icons-material/Refresh';

function IndexPopup() {

 
  const [currentPurpose, setCurrentPurpose] = useStorage("currentPurpose", (v) => v === undefined ? "Working hard": v);
  const [recentPurposes, setRecentPurposes] = useStorage("recentPurposes", (v) => v === undefined ? ["Working hard", "Playing hard"]: v);

  return (
      <div className="popup">
        <PopupHeader/>
        {/* <PopupCenter/> */}
        <PopupBottom/>
      </div>
  )
}

export default IndexPopup