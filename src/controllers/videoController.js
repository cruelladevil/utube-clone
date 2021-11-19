export const recommendedVideo = (req, res) => {
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
      views: 410,
      id: 1,
    },
    {
      title: "Second Video",
      rating: 4,
      comments: 2,
      createdAt: "1 minutes ago",
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
  return res.render("home", { pageTitle: "Home", fakeUser, videos });
}
export const watchVideo = (req, res) => res.render("watch", { pageTitle: "Watch" });
export const editVideo = (req, res) => res.render("edit", { pageTitle: "Edit" });
export const searchVideo = (req, res) => res.send("Search");
export const deleteVideo = (req, res) => res.send("Delete Video");
export const uploadVideo = (req, res) => res.send("Upload Video");
