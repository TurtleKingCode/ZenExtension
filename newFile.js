//const { openYouTubeTabs } = require("./background");
//
//// Handle tab URL changes (user navigates to/from YouTube)
//chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//    if (changeInfo.url) {
//        // User navigated to a new URL in an existing tab
//        const isYouTubeUrl = changeInfo.url.includes('youtube.com');
//        const wasTracked = openYouTubeTabs.has(tabId);
//
//        // If navigated to YouTube and wasn't tracked before
//        if (isYouTubeUrl && !wasTracked) {
//            console.log(`Navigated to YouTube: ${changeInfo.url} (Tab ID: ${tabId})`);
//            openYouTubeTabs.add(tabId);
//        }
//
//
//        // If navigated away from YouTube and was tracked before
//        else if (!isYouTubeUrl && wasTracked) {
//            console.log(`Navigated away from YouTube (Tab ID: ${tabId})`);
//            openYouTubeTabs.delete(tabId);
//        }
//    }
//    //tabId: ${JSON.stringify(tabId)}
//    console.log(`tabId: ${tabId}`, `changeInfo: ${JSON.stringify(changeInfo)}`, `tab: ${JSON.stringify(tab)}`);
//});
//
