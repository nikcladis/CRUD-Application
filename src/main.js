import { fetchData } from "./api";
import { setupEventListeners } from "./eventHandlers";
import { createUsersList } from "./domUtils";

// App Initialization
const init = async () => {
  const usersData = await fetchData();
  if (usersData) {
    const usersList = document.getElementById("usersList");
    createUsersList(usersData, usersList);
    setupEventListeners(usersData);
  }
};

init();
