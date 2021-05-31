const saveToLocalStorage = (name, data) => {
  localStorage.setItem(name, JSON.stringify(data));
};
const getLocalStorage = (name) => {
  const data = localStorage.getItem(name);
  if (data) {
    return JSON.parse(data);
  }
  return null;
};

const formatTime = (dateString) => {
  const date = new Date(dateString);
  const diff = Number(new Date()) - date;
  const day = 1000 * 60 * 60 * 24;
  const week = day * 7;
  const weekDays = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  if (diff < day) {
    return date.toLocaleTimeString(navigator.language, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }
  if (diff < week && diff > day) {
    return weekDays[date.getDay()];
  }

  return `${dd}/${mm}/${yyyy}`;
};

export {
  formatTime,
  getLocalStorage,
  saveToLocalStorage,
};
