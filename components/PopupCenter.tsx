/*global chrome*/
import { useStorage } from "@plasmohq/storage/hook";

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FormatAlignLeft from "@mui/icons-material/FormatAlignLeft";
import FormatAlignRight from "@mui/icons-material/FormatAlignRight";
import FormatAlignCenter from "@mui/icons-material/FormatAlignCenter";

function PopupCenter () {
    const [currentSiteURL, setCurrentSiteURL] = useStorage("currentSiteURL", (v) => v === undefined ? "google.com": v);
    const [currentSitePosition, setCurrentSitePosition] = useStorage("currentSitePosition", (v) => v === undefined ? "left": v);
    const [siteObjects, setSiteObjects] = useStorage("siteObjects", (v) => v === undefined ? [{url: "google.com", position: "left"}]: v);

    const handlePositionChange = (newPosition: string) => {
        let siteObject = siteObjects.find((siteObject) => siteObject.url === currentSiteURL);  
        if (!siteObject){
          setSiteObjects([...siteObjects, {url: currentSiteURL, position: newPosition}]);
        } else{
            siteObject.position = newPosition;
            setSiteObjects([...siteObjects]);
        }
        setCurrentSitePosition(newPosition); 
    }

    return (
        <div className="popup-center">
            <div className="upper">
                <div className="site-url">{currentSiteURL}</div>
            </div>
            <div className="lower">
                <div className="site-controls">
                    <IconButton aria-label="Left" size="small" onClick={async () => handlePositionChange("left")}>
                        <FormatAlignLeft fontSize="small" />
                    </IconButton>
                    <IconButton aria-label="Center" size="small" onClick={async () => handlePositionChange("center")}>
                        <FormatAlignCenter fontSize="small"/>
                    </IconButton>
                    <IconButton aria-label="Right" size="small" onClick={async () => handlePositionChange("right")}>
                        <FormatAlignRight fontSize="small"/>
                    </IconButton>
                    <IconButton aria-label="Disabled" size="small" onClick={async () => handlePositionChange("disabled")}>
                        <CloseIcon fontSize="small"/>
                    </IconButton>
                </div>
            </div> 
        </div>
    )
}

export default PopupCenter;