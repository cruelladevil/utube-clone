import "./db";
import "./model/Video";
import "./model/User";
import app from "./server";

const PORT = 6016;

const handleListening = () => console.log(`✅ Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);
