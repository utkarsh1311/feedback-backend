import * as dotenv from "dotenv";
dotenv.config();

import app from "./app";

app.listen(process.env.PORT || 3001, () => {
	console.log("Server is running on port 3000");
});
