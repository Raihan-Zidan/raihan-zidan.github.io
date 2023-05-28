const settings = {
  lang: "en",
  newtab: false,
  newurl: false,
  favicon: true,
};

function saveData() {
  const settingsJson = JSON.stringify(settings);
  const expirationDate = new Date();
  expirationDate.setMonth(expirationDate.getMonth() + 18);
  document.cookie = `settings=${settingsJson};expires=${expirationDate}`;
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
