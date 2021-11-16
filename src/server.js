import express from "express";

const PORT = 6016;

const app = express();

const methodLogger = (req, res, next) => {
  console.log(`Method: ${req.method}`);
  next();
}
const routerLogger = (req, res, next) => {
  console.log(`Path: ${req.path}`);
  next();
}
const handleHome = (req, res) => {
  return res.send("I'm still waiting for you.");
};
const handleLogin = (req, res) => {
  return res.send("Login here");
}

app.use(methodLogger, routerLogger);
app.get("/", handleHome);
app.get("/login", handleLogin);

const handleListening = () => console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);
