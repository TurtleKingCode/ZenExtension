export async function getActiveTab() {
	return await chrome.tabs.query({ active: true, currentWindow: true })[0];
	//const queryOptions = { active: true, currentWindow: true };
	//const tabs = await chrome.tabs.query(queryOptions);
	//return tabs[0];
}

//const fetchBookmarks = () => {
//	return new Promise((resolve) => {
//		chrome.storage.sync.get([currentVideo], (obj) => {
//			resolve(obj[currentVideo] ? JSON.parse(obj[currentVideo]) : []);
//		});
//	});
//};
