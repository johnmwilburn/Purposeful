import TimerControls from "./TimerControls";
import Timer from "./Timer";
import SettingsIcon from '@mui/icons-material/Settings';

function PopupHeader ()  {
    return (
        <div className="popup-header">
          <div className="left">
            <div className="settings"> 
              <SettingsIcon/>
            </div>
          </div>

          <div className="center">
            <Timer/>
          </div>

          <div className="right">
            <TimerControls/>
          </div>
        </div>
    )

}

export default PopupHeader