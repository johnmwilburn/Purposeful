import type { PlasmoContentScript, PlasmoGetStyle, PlasmoGetOverlayAnchor } from "plasmo";
import { useState, useEffect } from "react";
import { useStorage} from "@plasmohq/storage/hook";
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
  const [timerSeconds, setTimerSeconds] = useStorage("timerSeconds", (v) => v === undefined ? 3600 : v);
  const [gradientPercentage, setGradientPercentage] = useState(0);
  useEffect(() => { setGradientPercentage(((3600 - timerSeconds) / 3600) * 100) }, [timerSeconds]);

  return (
    <div className="purposeful-wrapper">
      <div className="purposeful-banner" style={{background: `linear-gradient(90deg, rgba(0, 128, 0, 0.5) 0%, rgba(64, 53, 53, 0.5) ${gradientPercentage}%)`}}>
        <div className="timer-container">
          <Timer />
        </div>
        <div className="purpose-container">
          <Purpose />
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
  } catch (e) {
    return;
  }
}

let banner = getBannerElement();
let bannerRect = banner?.getBoundingClientRect();
let bannerPosition = null;
let mouseOnBanner = false;

const storage = new Storage();

storage.watch({
  "tabChangeOccurred": (c) => {
    bannerPosition = null;
    banner.style.display = "block";
  },
})

window.onresize = () => {
  bannerPosition = null;
}

document.onmousemove = (event) => {
  // Get banner position if something has occurred that can change its position
  // (e.g. tab change, window resize, banner position change)

  if (!bannerPosition && banner?.style.display != "none") {
    banner = getBannerElement();
    bannerRect = banner?.getBoundingClientRect();
  }

  bannerPosition = {
    left: bannerRect?.left ?? 0,
    top: bannerRect?.top ?? 0,
    right: bannerRect?.right ?? 0,
    bottom: bannerRect?.bottom ?? 0,
  };

  // Checking if mouse is on banner to determine if it should be displayed
  let x = event.clientX;
  let y = event.clientY;

  if (x > bannerPosition.left && x < bannerPosition.right && y > bannerPosition.top && y < bannerPosition.bottom) {
    if (mouseOnBanner == false) {
      banner.style.display = "none";
      mouseOnBanner = true;
    }
  } else if (mouseOnBanner == true) {
    banner.style.display = "block";
    mouseOnBanner = false;
  }
}