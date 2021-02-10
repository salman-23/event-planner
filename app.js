const express = require("express");
const eventRoutes = require("./routes/events");
const app = express();

app.use(express.json());
app.use("/events", eventRoutes);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
