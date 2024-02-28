//emulating a db
const usersDb = {
  users: require("../data/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const fsPromises = require("fs").promises;
const path = require("path");
const handleLogout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.status(401);
  }
  console.log(cookies.jwt);
  const refreshToken = cookies.jwt;
  //find the user
  const foundUser = usersDb.users.find((person) => {
    return person.refreshToken == refreshToken;
  });
  if (!foundUser) return res.status(401); //Forbidden
  //evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username)
      return res.sendStatus(403);
    const accessToken = jwt.sign(
      { username: decoded.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    res.json({ accessToken });
  });
};

module.exports = { handleRefreshToken };
