let isEnabled = false;

const reload = () => {
  chrome.tabs.query({ status: "complete" }, (tabs) => {
    tabs.forEach((tab) => {
      if (tab.active) {
        chrome.tabs.reload(tab.id);
      }
    });
  });
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ isEnabled: false });
  chrome.action.setBadgeText({
    text: "OFF",
  });
  chrome.action.setBadgeBackgroundColor({
    color: isEnabled ? [100, 255, 100, 255] : [255, 100, 100, 255],
  });
});

const toggleState = async () => {
  const { isEnabled } = await chrome.storage.local.get(["isEnabled"]);
  const next = !isEnabled;

  await chrome.storage.local.set({ isEnabled: next });
  await chrome.action.setBadgeText({ text: next ? "ON" : "OFF" });
  await chrome.action.setBadgeBackgroundColor({
    color: next ? [100, 255, 100, 255] : [255, 100, 100, 255],
  });
  reload();
};

chrome.action.onClicked.addListener(toggleState);
