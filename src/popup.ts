document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('toggleScraping') as HTMLButtonElement;
  const downloadButton = document.getElementById('downloadData') as HTMLButtonElement;
  const statusDiv = document.getElementById('status') as HTMLDivElement;

  let isActive = false;

  chrome.runtime.sendMessage({ action: 'getState' }, (state) => {
    isActive = state.isActive;
    updateUI();
  });

  toggleButton.addEventListener('click', () => {
    isActive = !isActive;
    chrome.runtime.sendMessage({
      action: 'toggleScraping',
      isActive
    }, () => {
      updateUI();
    });
  });

  downloadButton.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'getState' }, (state) => {
      const blob = new Blob([JSON.stringify(state.tweets, null, 2)], {
        type: 'application/json'
      });
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `twitter-data-${new Date().toISOString()}.json`;
      a.click();
      URL.revokeObjectURL(url);
    });
  });

  function updateUI() {
    toggleButton.textContent = isActive ? 'Stop Scraping' : 'Start Scraping';
    statusDiv.textContent = isActive ? 'Scraping is active' : 'Scraping is inactive';
  }
});