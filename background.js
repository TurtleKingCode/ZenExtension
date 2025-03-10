import { getActiveTab } from './utils.js';

// background.js
console.log('Focus Timer extension background script loaded');

// Track YouTube tabs that are currently open
const openYouTubeTabs = new Set();

//chrome.tabs.query({ currentWindow: true }, (tabs) => {
//	console.log('tabs: ', tabs);
//});
chrome.tabs.query({}, (tabs) => {
	tabs.forEach((tab) => {
		if (tab.url && tab.url.includes('youtube.com')) {
			openYouTubeTabs.add(tab.id);
			console.log([...openYouTubeTabs]);
		}
	});
});

// Listen for tab updates (including new tabs being created)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	// Check if the tab has completed loading and has a YouTube URL
	if (changeInfo.status === 'complete' && tab.url && tab.url.includes('youtube.com')) {
		// Check if this is a new YouTube tab we haven't seen before
		if (!openYouTubeTabs.has(tabId)) {
			console.log('NEW TAB YOUTUBE');
			console.log(`YouTube tab opened: ${tab.url} (Tab ID: ${tabId})`);
			openYouTubeTabs.add(tabId);
			console.log([...openYouTubeTabs]);
		}
	}
});

/*
//chrome.tabs.onActivated.addListener(moveToFirstPosition);

async function moveToFirstPosition(activeInfo) {
	try {
		await chrome.tabs.move(activeInfo.tabId, { index: 0 })
		console.log('Success.');
	} catch (error) {
		if (error == 'Error: Tabs cannot be edited right now (user may be dragging a tab).') {
			setTimeout(() => moveToFirstPosition(activeInfo), 50);
		} else {
			console.error(error);
		}
	}
}
*/

// Listen for tabs being closed
chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
	// Check if the closed tab was a YouTube tab
	if (openYouTubeTabs.has(tabId)) {
		console.log('CLOSED TAB YOUTUBE');
		console.log(`YouTube tab closed (Tab ID: ${tabId})`);
		openYouTubeTabs.delete(tabId);
		console.log([...openYouTubeTabs]);
	}
});

//chrome.tabs.onActivated.addListener((activeInfo) => {
//	console.log(`Tab activated (Tab ID: ${activeInfo.tabId})`);
//	console.log(activeInfo);
//	console.log(`Tab details:`, chrome.tabs.get(activeInfo.tabId));
//});

// Handle tab URL changes (user navigates to/from YouTube)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	if (changeInfo.url) {
		// User navigated to a new URL in an existing tab
		const isYouTubeUrl = changeInfo.url.includes('youtube.com');
		const wasTracked = openYouTubeTabs.has(tabId);

		// If navigated to YouTube and wasn't tracked before
		if (isYouTubeUrl && !wasTracked) {
			console.log('CHANGED TAB TO YOUTUBE');
			console.log(`Navigated to YouTube: ${changeInfo.url} (Tab ID: ${tabId})`);
			openYouTubeTabs.add(tabId);
			console.log([...openYouTubeTabs]);
		}

		// If navigated away from YouTube and was tracked before
		else if (!isYouTubeUrl && wasTracked) {
			console.log('CHANGED TAB FROM YOUTUBE');
			console.log(`Navigated away from YouTube (Tab ID: ${tabId})`);
			openYouTubeTabs.delete(tabId);
			console.log([...openYouTubeTabs]);
		}
	}
	//tabId: ${JSON.stringify(tabId)}
	//console.log(`tabId: ${tabId}`, `changeInfo: ${JSON.stringify(changeInfo)}`, `tab: ${JSON.stringify(tab)}`);
});
