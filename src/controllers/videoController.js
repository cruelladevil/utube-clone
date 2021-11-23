const fakeUser = {
  username: "Cruella",
  loggedIn: true,
};
const videos = [
  {
    title: "First Video",
    rating: 5,
    comments: 3,
    createdAt: "5 minutes ago",
    views: 1,
    id: 1,
  },
  {
    title: "Second Video",
    rating: 4,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 240,
    id: 2,
  },
  {
    title: "Third Video",
    rating: 1,
    comments: 1,
    createdAt: "3 minutes ago",
    views: 2,
    id: 3,
  },
];

export const recommendedVideo = (req, res) => {
  return res.render("home", { pageTitle: "Home", fakeUser, videos });
};
export const watchVideo = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  return res.render("watch", { pageTitle: `Watching ${video.title}`, fakeUser, video });
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
export const postUploadVideo = (req, res) => {
  const { title } = req.body;
  const newVideo = {
    title,
    rating: 0,
    comments: 0,
    createdAt: "just now",
    views: 0,
    id: videos.length + 1,
  }
  videos.push(newVideo);
  return res.redirect("/");
};
