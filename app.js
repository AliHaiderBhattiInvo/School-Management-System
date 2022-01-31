const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./server/routes/user')
const authRoutes = require("./server/routes/auth")
const courseRoutes = require("./server/routes/course")

// Set up the express app
const app = express();


// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup a default catch-all route that sends back a welcome message in JSON format.
// app.get('*', (req, res) => res.status(200).send({
//   message: 'Welcome to the beginning.',
// }));

app.use('/api', userRoutes);
app.use("/api", authRoutes)
app.use("/api", courseRoutes)

const port = process.env.PORT || 4000
app.listen(port,()=>{
console.log("Server is running on: " + port);
})

// module.exports = app;