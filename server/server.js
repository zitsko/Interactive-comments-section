const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());

const commentRouter = require("./routers/tradeRouter");
const userRouter = require("./routers/userRouter");

app.use(
    cors({
        origin: "*",
    })
);

app.use("/comment", commentRouter);
app.use("/user", userRouter);

app.listen(3005, () => {
    console.log("server is running on port 3005");
});