const generateId = () => Math.floor(Math.random() * 10000);
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

export {
  generateId, getLocalStorage,
  saveToLocalStorage,
};
