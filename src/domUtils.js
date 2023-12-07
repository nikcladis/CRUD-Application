// domUtils.js
const createUser = ({
  name,
  username,
  email,
  address: { city, zipcode },
  phone
}) => {
  return `<li class="userInfo">
            <p>Name: ${name}</p>
            <p>Username: ${username}</p>
            <p>Email: ${email}</p>
            <p>City: ${city}</p>
            <p>Zipcode: ${zipcode}</p>
            <p>Phone: ${phone}</p>
          </li>`;
};

const createUsersList = (users, list) => {
  list.innerHTML = "";
  users.forEach((user) => {
    list.innerHTML += createUser(user);
  });
};

export { createUsersList, createUser };
