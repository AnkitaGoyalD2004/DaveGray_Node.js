const userDB = {
  users: require("../data/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(404)
      .json({ message: "username and password are required." });
  //check for duplicate username in db
  const duplicate = userDB.users.find((person) => person.username === user);
  if (duplicate) return res.sendStatus(409);
  try {
    // encrypt the pass
    const hashedPwd = await bcrypt.hash(pwd, 10);
    //store the new user
    const newUser = { username: user, password: hashedPwd };
    userDB.setUsers([...usersDB.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, "..", "dara", "users.JSON"),
      JSON.stringify(userDB.users)
    );
    console.log(usersDB.users);
    res.status(201).json({ success: `New user ${user} created` });
  } catch (err) {
    res.status(500).json({ message: err, message });
  }
};
module.exports = { handleNewUser };
