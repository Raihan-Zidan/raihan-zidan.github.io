const settings = {
  lang: "en",
};

function saveData() {
  const settingsJson = JSON.stringify(settings);
  document.cookie = `settings=${settingsJson};expires=${new Date(new Date().getTime() + 1000 * 60 * 60 * 24)}`;
}

function getData() {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const parts = cookie.split('=');
    if (parts[0] === 'settings') {
      return JSON.parse(parts[1]);
    }
  }
  return null;
}
