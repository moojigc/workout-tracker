const express = require("express"),
	mongoose = require("mongoose"),
	PORT = process.env.PORT || 3500;

mongoose
	.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useCreateIndex: true, useUnifiedTopology: true, useNewUrlParser: true })
	.then((conn) => console.log("Connected to " + conn.connection.db.databaseName))
	.catch((err) => console.error(err));

const app = express();

app.use(express.urlencoded({ extended: true }))
	.use(express.json())
	.use(express.static("public", { extensions: ["html"] }));
require("./routes/workout-router")(app, mongoose.Types.ObjectId);

app.listen(PORT, (err) => {
	if (err) throw err;
	else console.log(`Listening on port ${PORT}.`);
});
