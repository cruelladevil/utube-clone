import userModel from "../model/User";
import videoModel from "../model/Video";

export const recommendedVideo = async (req, res) => {
  const videos = await videoModel.find({});
  return res.render("home", { pageTitle: "Home", videos });
};
export const watchVideo = async (req, res) => {
  const { id } = req.params;
  const video = await videoModel.findById(id).populate("owner");
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video Not Found" });
  }
  return res.render("watch", { pageTitle: video.title, video });
};
export const getEditVideo = async (req, res) => {
  const { id } = req.params;
  const { user: { _id } } = req.session;
  const video = await videoModel.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video Not Found" });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  return res.render("edit-video", { pageTitle: `Edit : ${video.title}`, video });
};
export const postEditVideo = async (req, res) => {
  const { id } = req.params;
  const { user: { _id } } = req.session;
  const { title, description, hashtags } = req.body;
  const video = await videoModel.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video Not Found" });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await videoModel.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: videoModel.formatHashtags(hashtags),
  });
  return res.redirect(`/videos/${id}`);
};
export const searchVideo = async (req, res) => {
  const { search_query } = req.query;
  let videos = [];
  if (search_query) {
    videos = await videoModel.find({
      title: {
        $regex: new RegExp(search_query, "i"),
      },
    });
  }
  return res.render("search", { pageTitle: "Search", videos });
};
export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const { user: { _id } } = req.session;
  const video = await videoModel.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video Not Found" });
  }
  if (String(video.owner._id) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await videoModel.findByIdAndDelete(id);
  const user = await userModel.findById(_id);
  user.videos.splice(user.videos.indexOf(id), 1);
  user.save();
  return res.redirect("/");
};
export const getUploadVideo = (req, res) => {
  res.render("upload", { pageTitle: "Upload Video" });
};
export const postUploadVideo = async (req, res) => {
  const { user: { _id } } = req.session;
  const { path: fileUrl } = req.file;
  const { title, description, hashtags } = req.body;
  try {
    const newVideo = await videoModel.create({
      title,
      fileUrl,
      description,
      owner: _id,
      hashtags: videoModel.formatHashtags(hashtags),
    });
    const user = await userModel.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    return res.redirect("/");
  } catch (err) {
    return res.render("upload", { pageTitle: "Upload Video", errorMessage: err._message });
  }
};
