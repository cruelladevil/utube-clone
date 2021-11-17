import express from "express";
import morgan from "morgan";

const PORT = 6016;

const app = express();
const logger = morgan("dev");

const handleHome = (req, res) => {
  return res.send("I'm still waiting for you.");
};
const handleLogin = (req, res) => {
  return res.send("Login here");
}

app.use(logger);
app.get("/", handleHome);
app.get("/login", handleLogin);

const handleListening = () => console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);
