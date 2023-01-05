export {};

import { Storage } from "@plasmohq/storage"
 
const storage = new Storage()

const handleActiveTabChange = (tabId) => {
  chrome.tabs.get(tabId, (tab) => {
    if (tab.url) {
      let baseURL = tab.url.split("/")[2].replace("www.", "");
      storage.set("currentSiteURL", baseURL);
  }})

  // storage.get("timerState").then((timerState) => {
  //   if (timerState === "running") {
  //     storage.set("timerState", "stopped").then(() =>storage.set("timerState", "running"));
  //     console.log("TRYING TO RESTART TIMER!!");
  //   }
  // })

  // This is to trigger the watch event in content.tsx to determine if the banner position needs to be recalculated
  storage.set("tabChangeOccurred", Math.random()) 
}

chrome.tabs.onUpdated.addListener((tabId) => handleActiveTabChange(tabId));
chrome.tabs.onActivated.addListener((tab) => handleActiveTabChange(tab.tabId));

let timerInterval: NodeJS.Timer | number | undefined;

storage.watch({
  "timerState": (c) => {
    console.log("Saw timerState change to", c)
    if (c.newValue === "running"){
      timerInterval = setInterval(() => {
        storage.get("timerSeconds").then((timerSeconds) => {
        if (typeof timerSeconds !== "number") return;
        if (timerSeconds <= 0){
          clearInterval(timerInterval)
          storage.set("timerState", "stopped")
          return;
        }
        storage.set("timerSeconds", timerSeconds - 1)

        if (timerSeconds % 15 == 0){
          console.log("Restarting service worker")
          storage.set("timerState", "stopped")
          storage.set("timerState", "running")
        }
        })
      }, 1000)
    }
    else if (c.newValue === "stopped"){
      clearInterval(timerInterval)
    }
  }
})