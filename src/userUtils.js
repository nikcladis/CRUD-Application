// userUtils.js
const filterUsers = (users, searchString) => {
  const regex = new RegExp(`^${searchString}`, "i");
  return users.filter(({ name }) => regex.test(name));
};

const sortUsers = (users, ascending) =>
  users.slice().sort((a, b) => {
    const comparison = a.name.localeCompare(b.name);
    return ascending ? comparison : -comparison;
  });

export { filterUsers, sortUsers };
