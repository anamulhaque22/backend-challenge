// external imports
const dotenv = require("dotenv");

//internal imports
const app = require("./app");

dotenv.config();

app.listen(process.env.PORT, () => {
  console.dir(`App is listing to port ${process.env.PORT}`);
});
