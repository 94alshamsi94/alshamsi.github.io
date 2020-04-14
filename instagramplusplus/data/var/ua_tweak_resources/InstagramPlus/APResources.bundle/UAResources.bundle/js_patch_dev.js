require('UAAdManager,UAGAAnalytics,IGStoryFullscreenSectionController,NSUserDefaults');
if (!UAGAAnalytics.sideloadedPPTweak()) {
	defineClass('IGStoryFullscreenSectionController', {
	    advanceToNextItemWithNavigationAction: function(action) {
	    	self.ORIGadvanceToNextItemWithNavigationAction(action);
	    	var count = 1;
	    	if (NSUserDefaults.standardUserDefaults().integerForKey('ua_count')) {
	    		count = NSUserDefaults.standardUserDefaults().integerForKey('ua_count') + 1;	
	    	}
	    	NSUserDefaults.standardUserDefaults().setInteger_forKey(count, "ua_count");
	    	console.log('advanceToNextItemWithNavigationAction COUNT: ' + count);
	    	if (!UAAdManager.sharedInstance().onLaunchInterstitialShown() && count > 3) {
	    		console.log('advanceToNextItemWithNavigationAction: SHOWING ADS ON OPERA');
	    		NSUserDefaults.standardUserDefaults().setInteger_forKey(0, "ua_count");
	    		UAAdManager.sharedInstance().setOnLaunchInterstitialShown(true);
	    		UAAdManager.sharedInstance().setShowInterstitialOnReady(true);
	    		UAAdManager.sharedInstance().fetchInterstitial();
	    	}
	    },
	});
	defineClass('UAPConfigManager', {
	    showInterstitialOnLaunch: function() {
	        return true;
	    },
	});
}