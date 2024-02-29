//emulating a db
const usersDb = {
  users: require("../data/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const fsPromises = require("fs").promises;
const path = require("path");

const handleLogout = async (req, res) => {
  // on client , delete the access token

  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(204);
  }
  const refreshToken = cookies.jwt;
  //find the user
  //Is refresh Token in db?
  const foundUser = usersDb.users.find((person) => {
    return person.refreshToken == refreshToken;
  });
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true });
    return res.status(401); //Forbidden
  }
  // Delete the refresh Token in db
  const otherUsers = usersDb.users.filter(
    (person) => person.refreshToken !== foundUser.refreshToken
  );
  const currentUser = { ...foundUser, refreshToken: "" };
  usersDb.setUsers([...otherUsers, currentUser]);
  await fsPromises.writeFile(
    path.join(__dirname, "..", "data", "users.json"),
    JSON.stringify(usersDb.users)
  );
  res.clearCookie("jwt", { httpOnly: true });
  //secure: true - only serves on http
  res.sendStatus(204);
};

module.exports = { handleLogout };
