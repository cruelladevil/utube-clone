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
  if (video === null) {
    return res.render("404", { pageTitle: "Video Not Found", fakeUser });
  }
  return res.render("watch", { pageTitle: video.title, fakeUser, video });
};
export const getEditVideo = async (req, res) => {
  const { id } = req.params;
  const video = await videoModel.findById(id);
  if (video === null) {
    return res.render("404", { pageTitle: "Video Not Found", fakeUser });
  }
  return res.render("edit", { pageTitle: `Edit : ${video.title}`, fakeUser, video });
};
export const postEditVideo = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await videoModel.exists({ _id: id });
  if (!video) {
    return res.render("404", { pageTitle: "Video Not Found", fakeUser });
  }
  await videoModel.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: videoModel.formatHashtags(hashtags),
  });
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
      hashtags: videoModel.formatHashtags(hashtags),
    });
    return res.redirect("/");
  } catch (err) {
    return res.render("upload", { pageTitle: "Upload Video", fakeUser, errorMessage: err._message });
  }
};
