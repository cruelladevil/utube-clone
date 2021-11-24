const fakeUser = {
  username: "Cruella",
  loggedIn: true,
};
import videoModel from "../model/Video";

export const recommendedVideo = async (req, res) => {
  const videos = await videoModel.find({});
  return res.render("home", { pageTitle: "Home", fakeUser, videos });
};
export const watchVideo = async (req, res) => {
  const { id } = req.params;
  const video = await videoModel.findById(id);
  return res.render("watch", { pageTitle: video.title, fakeUser, video });
};
export const getEditVideo = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render("edit", { pageTitle: "Edit", fakeUser, video });
};
export const postEditVideo = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  videos[id - 1].title = title;
  return res.redirect(`/videos/${id}`);
};
export const searchVideo = (req, res) => res.send("Search");
export const deleteVideo = (req, res) => res.send("Delete Video");
export const getUploadVideo = (req, res) => {
  res.render("upload", { pageTitle: "Upload Video", fakeUser });
};
export const postUploadVideo = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await videoModel.create({
      title,
      description,
      hashtags: hashtags.split(",").map((word) => `#${word}`),
    });
    return res.redirect("/");
  } catch (err) {
    res.render("upload", { pageTitle: "Upload Video", fakeUser, errorMessage: err._message });
  }
};
