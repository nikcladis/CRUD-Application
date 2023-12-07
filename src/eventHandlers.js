import { filterUsers, sortUsers } from "./userUtils";
import { createUsersList } from "./domUtils";

let usersDataCache = null;
let isSortedAscending = false;
let currentDisplayedUsers = [];
const usersListElement = document.getElementById("usersList");

// Update the users list based on the current displayed users
const updateUsersList = (users) => {
  createUsersList(users, usersListElement);
};

// Handle the logic when sorting users
const handleSortClick = () => {
  isSortedAscending = !isSortedAscending;
  const sortedUsers = sortUsers(currentDisplayedUsers, isSortedAscending);
  updateUsersList(sortedUsers);
};

// Handle the logic when input is detected in the search box
const handleSearchInput = (searchString) => {
  if (usersDataCache) {
    currentDisplayedUsers = filterUsers(usersDataCache, searchString);
    updateUsersList(currentDisplayedUsers);
  }
};

// Setup event listeners for DOM elements
const setupEventListeners = (usersData) => {
  usersDataCache = usersData;
  currentDisplayedUsers = usersData;

  document.getElementById("sortBtn").onclick = handleSortClick;
  document.getElementById("searchInput").oninput = function () {
    handleSearchInput(this.value);
  };
};

// Save a new user and update the users list in the DOM
const saveUser = (newUser) => {
  console.log("Saving user:", newUser);
  usersDataCache.push(newUser);
  updateUsersList(usersDataCache);
};

export { setupEventListeners, saveUser };
