const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { NotFoundError } = require("./utils/errors");
const { PORT } = require("./config");
const security = require("./middleware/security");
const authRoutes = require("./routes/auth");
const storeRoutes = require("./routes/store");

const app = express();
// const port = 5173;
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json()); //json middleware needed to send json to post

app.use(security.extractUserFromJwt);

app.use("/auth", authRoutes);
app.use("/store", storeRoutes);

app.use((req, res, next) => {
  return next(new NotFoundError());
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
