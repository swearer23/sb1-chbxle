import { Tweet } from './types';

class TwitterScraper {
  private observer: MutationObserver | null = null;

  initialize() {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === 'toggleScraping') {
        message.isActive ? this.startScraping() : this.stopScraping();
        sendResponse({ success: true });
      }
      return true;
    });
  }

  private startScraping() {
    this.observer = new MutationObserver(this.handleMutations.bind(this));
    this.observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    this.scrapeFeed();
  }

  private stopScraping() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  private handleMutations(mutations: MutationRecord[]) {
    this.scrapeFeed();
  }

  private scrapeFeed() {
    const tweets = Array.from(document.querySelectorAll('article[data-testid="tweet"]'))
      .map(this.scrapeTweet)
      .filter((tweet): tweet is Tweet => tweet !== null);

    chrome.runtime.sendMessage({
      action: 'storeTweets',
      tweets
    });
  }

  private scrapeTweet(tweetElement: Element): Tweet | null {
    try {
      const id = tweetElement.getAttribute('data-tweet-id') || '';
      const text = tweetElement.querySelector('[data-testid="tweetText"]')?.textContent || '';
      const author = tweetElement.querySelector('[data-testid="User-Name"]')?.textContent || '';
      const timestamp = tweetElement.querySelector('time')?.getAttribute('datetime') || '';
      
      const stats = tweetElement.querySelectorAll('[data-testid$="-count"]');
      const likes = parseInt(stats[0]?.textContent || '0', 10);
      const retweets = parseInt(stats[1]?.textContent || '0', 10);

      return { id, text, author, timestamp, likes, retweets };
    } catch (error) {
      console.error('Error scraping tweet:', error);
      return null;
    }
  }
}

new TwitterScraper().initialize();