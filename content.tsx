import type { PlasmoContentScript, PlasmoGetStyle, PlasmoGetOverlayAnchor } from "plasmo";
import React from "react";
import Timer from "./components/Timer";
import Purpose from "./components/Purpose";
import { Storage } from "@plasmohq/storage";
import styleText from "data-text:./content-style.scss";

export const config: PlasmoContentScript = {
  matches: ["<all_urls>"]
};

export const getStyle: PlasmoGetStyle = () => {
  const style = document.createElement("style");
  style.textContent = styleText;
  return style;
};

const PurposefulBanner = () => {   
    return (
      <div className="purposeful-wrapper">
          <div className="purposeful-banner">
              <div className="timer-container">
                <Timer/>
              </div>
              <div className="purpose-container">
                <Purpose/>
              </div>
          </div>
      </div>
    )
};
   
export default PurposefulBanner

const getBannerElement = () => {
  try {
    let plasmoCsui = document.querySelector("plasmo-csui");
    let shadowRoot = plasmoCsui.shadowRoot;
    let banner = shadowRoot.querySelector(".purposeful-banner") as HTMLElement;
    return banner;
  } catch (e){
    return;
  } 
}

let banner = getBannerElement();
let bannerPosition = null;
let mouseOnBanner = false;

const storage = new Storage();

storage.watch({
  "tabChangeOccurred": (c) => {
    bannerPosition = null;
  },
})

window.onresize = () => {
  bannerPosition = null;
}

document.onmousemove = (event) => {
  // Get banner position if something has occurred that can change its position
  // (e.g. tab change, window resize, banner position change)
  if (!bannerPosition && !mouseOnBanner){ // If mouse is on banner, (banner display set to none), rectangle boundary will be set as 0 by 0
    banner = getBannerElement();
    let bannerRect = banner?.getBoundingClientRect();

    bannerPosition = {
      left: bannerRect?.left,
      top: bannerRect?.top,
      right: bannerRect?.right,
      bottom: bannerRect?.bottom,
    };
  }

  // Checking if mouse is on banner to determine if it should be displayed
  let x = event.clientX;
  let y = event.clientY;

  if (x > bannerPosition.left && x < bannerPosition.right && y > bannerPosition.top && y < bannerPosition.bottom){
    if (mouseOnBanner == false){
      banner.style.display = "none"; 
      mouseOnBanner = true;
    }
  } else if (mouseOnBanner == true){
      banner.style.display = "block";
      mouseOnBanner = false;
  }
}