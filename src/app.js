const express = require('express'); // get expres
const app = express(); // create instance of express
// app.listen(3000); // server listening on port 3000

app.use("/test", (req, res) => {
    res.send("Hello from the server");
});

app.use("/hello", (req, res) => {
    res.send("Hello from the server1");
});

app.listen(7777, function() {
console.log("server is running");
});