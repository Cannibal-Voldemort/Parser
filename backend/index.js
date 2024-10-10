const express = require("express");
const uploadRouter = require("./routes/uploadRoute");
const twitterRoutes= require('./routes/uploadRoute')

const app = express();
const port = 3000;


app.use(express.json());


app.use("/api", uploadRouter);
app.use('/api/twitter', twitterRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


