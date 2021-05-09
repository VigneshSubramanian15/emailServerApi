const express = require("express");
const { email } = require("./email");
const app = express();
var qr = require("qr-image");

app.use(express.json());
app.use("/images", express.static("./Images"));

app.post("/", async (req, res) => {
    try {
        await email(req.body);
        res.send("Success");
    } catch (error) {
        console.log(error);
        res.status(400).send("Error Sending Email");
    }
});

app.get("/qr/:text", async (req, res) => {
    try {
        var code = qr.image(req.params.text, { type: "svg" });
        res.type("svg");
        code.pipe(res);
    } catch (error) {
        console.log(error);
        res.status(400).send("Error Sending Email");
    }
});

app.listen(3000, () => console.log("Server Started"));
