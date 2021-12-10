import userModel from "../model/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
  const { name, email, username, password, password2, location } = req.body;
  const pageTitle = "Join";
  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "check password confirmation",
    });
  }
  const exists = await userModel.exists({ $or: [{ email }, { username }] });
  if (exists) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "this email/username is already taken.",
    });
  }
  userModel.create({
    name,
    email,
    username,
    password,
    location,
  });
  return res.redirect("/login");
};
export const getEditUser = (req, res) => {
  return res.render("edit-profile", { pageTitle: "Edit Profile" });
};
export const postEditUser = async (req, res) => {
  const { session: { user: { _id } }, body: { email, username, location } } = req;
  const updatedUser = await userModel.findByIdAndUpdate(
    _id,
    {
      email,
      username,
      location,
    },
    { new: true }
  );
  req.session.user = updatedUser;
  return res.redirect("/users/edit");
}
export const deleteUser = (req, res) => res.send("Delete User");
export const getLogin = (req, res) => res.render("login", { pageTitle: "Login" });
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const pageTitle = "login";
  const findUser = await userModel.findOne({ username });
  if (!findUser) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "An account with this username doesn't exist",
    });
  }
  const match = await bcrypt.compare(password, findUser.password);
  if (!match) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "Wrong password",
    });
  }
  req.session.loggedIn = true;
  req.session.user = findUser;
  res.redirect("/");
};
export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
}
export const seeUser = (req, res) => res.send("See User");
export const getChangePassword = (req, res) => {
  return res.render("change-password", { pageTitle: "Change Password" });
}
export const postChangePassword = async (req, res) => {
  const pageTitle = "Change Password";
  const { session: { user: { _id, password } }, body: { oldPassword, newPassword, newPassword2 } } = req;
  const user = await userModel.findById(_id);
  const match = await bcrypt.compare(oldPassword, password);
  if (!match) {
    return res.status(400).render("change-password", {
      pageTitle,
      errorMessage: "current password is incorrect",
    });
  }
  if (newPassword !== newPassword2) {
    return res.status(400).render("change-password", {
      pageTitle,
      errorMessage: "check password confirmation",
    });
  }
  user.password = newPassword;
  await user.save();
  return res.redirect("/users/logout");
}
