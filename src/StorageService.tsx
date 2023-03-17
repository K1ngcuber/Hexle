// Check if item exists in local storage and return it
export const loadItem = (item: string) => {
  const savedData = localStorage.getItem("hexle");
  if (!savedData) {
    return;
  }
  const parsedData = JSON.parse(savedData);
  return parsedData[item];
};

// Save item to local storage
export const saveItem = (item: string, value: string) => {
  const savedData = localStorage.getItem("hexle") ?? "{}";
  const parsedData = JSON.parse(savedData);
  parsedData[item] = value;
  localStorage.setItem("hexle", JSON.stringify(parsedData));
};

//Clear local storage and keep tutorial value
export const clearStorage = () => {
  const tutorial = loadItem("tutorial");
  localStorage.removeItem("hexle");
  if (tutorial) {
    saveItem("tutorial", tutorial);
  }
};
