import { ScrapingState, Tweet } from './types';

class BackgroundService {
  private state: ScrapingState = {
    isActive: false,
    lastRefresh: Date.now(),
    tweets: []
  };

  private refreshInterval: number = 5 * 60 * 1000; // 5 minutes

  constructor() {
    this.initialize();
  }

  private initialize() {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      switch (message.action) {
        case 'storeTweets':
          this.handleNewTweets(message.tweets);
          break;
        case 'getState':
          sendResponse(this.state);
          break;
        case 'toggleScraping':
          this.toggleScraping(message.isActive);
          sendResponse({ success: true });
          break;
      }
      return true;
    });

    setInterval(() => {
      if (this.state.isActive) {
        this.refreshFeed();
      }
    }, this.refreshInterval);
  }

  private async toggleScraping(isActive: boolean) {
    this.state.isActive = isActive;
    const tabs = await chrome.tabs.query({ url: ['*://*.twitter.com/*', '*://*.x.com/*'] });
    
    tabs.forEach(tab => {
      if (tab.id) {
        chrome.tabs.sendMessage(tab.id, {
          action: 'toggleScraping',
          isActive
        });
      }
    });
  }

  private handleNewTweets(newTweets: Tweet[]) {
    const uniqueTweets = newTweets.filter(
      newTweet => !this.state.tweets.some(
        existingTweet => existingTweet.id === newTweet.id
      )
    );

    this.state.tweets.push(...uniqueTweets);
    this.state.lastRefresh = Date.now();
  }

  private async refreshFeed() {
    const tabs = await chrome.tabs.query({ url: ['*://*.twitter.com/*', '*://*.x.com/*'] });
    
    tabs.forEach(tab => {
      if (tab.id) {
        chrome.tabs.reload(tab.id);
      }
    });
  }
}

new BackgroundService();