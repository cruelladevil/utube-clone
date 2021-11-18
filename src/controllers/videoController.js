export const recommendedVideo = (req, res) => res.send("Recommended Videos");
export const watchVideo = (req, res) => res.send(`Watch Video #${req.params.id}`);
export const editVideo = (req, res) => res.send("Edit Video");
export const searchVideo = (req, res) => res.send("Search");
export const deleteVideo = (req, res) => res.send("Delete Video");
export const uploadVideo = (req, res) => res.send("Upload Video");
