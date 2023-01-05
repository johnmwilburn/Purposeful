import TimerControls from "./TimerControls";
import Timer from "./Timer";
import SettingsIcon from '@mui/icons-material/Settings';

function PopupHeader ()  {
    return (
        <div className="popup-header">
          <div className="left">
            <TimerControls/>
          </div>

          <div className="center">
            <Timer/>
          </div>

          <div className="right">
            <div className="settings"> 
              <SettingsIcon/>
            </div>
          </div>
        </div>
    )

}

export default PopupHeader