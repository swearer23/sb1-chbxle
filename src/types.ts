export interface Tweet {
  id: string;
  text: string;
  author: string;
  timestamp: string;
  likes: number;
  retweets: number;
}

export interface ScrapingState {
  isActive: boolean;
  lastRefresh: number;
  tweets: Tweet[];
}