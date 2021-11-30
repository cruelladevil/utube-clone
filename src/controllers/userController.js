import userModel from "../model/User";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
  const { name, email, username, password, location } = req.body;
  userModel.create({
    name,
    email,
    username,
    password,
    location,
  });
  return res.redirect("/login");
}
export const editUser = (req, res) => res.send("Edit User");
export const deleteUser = (req, res) => res.send("Delete User");
export const login = (req, res) => res.send("Log In");
export const logout = (req, res) => res.send("Log Out");
export const seeUser = (req, res) => res.send("See User");
