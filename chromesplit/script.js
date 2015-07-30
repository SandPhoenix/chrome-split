chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.system.display.getInfo(function(info){
		chrome.windows.getCurrent({},function(current){
			chrome.tabs.query({windowId:current.id},function(tabs){
				if (tabs.length > 1){
					var screenWidth = info[0].bounds.width;
					var screenHeight = info[0].bounds.height;
					chrome.windows.update(current.id,{
						width: screenWidth/2,
						height: screenHeight,
						top: 0,
						left: 0,
					});
					chrome.windows.create({
						width: screenWidth/2,
						height: screenHeight,
						top: 0,
						left: screenWidth/2,
						},function(newWindow){								
							for (var i = tabs.length - 1; i >= 0; i--) {
								if (i >= Math.ceil((tabs.length)/2)){
									var tab = tabs[i]
									chrome.tabs.move(tab.id,{
										windowId:newWindow.id,
										index: -1,
									});
								}
							}
							chrome.tabs.query({windowId:newWindow.id},function(newTabs){
								chrome.tabs.remove(newTabs[0].id)
							});
							
					});
				}
			});
		});
	});
});
chrome.browserAction.setBadgeText({text: "10+"});
chrome.browserAction.setBadgeBackgroundColor({color:[70,198,162,255]});