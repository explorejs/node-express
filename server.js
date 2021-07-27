const express = require("express");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.status(200).send({ data: "cool" });
});

app.get("/user", (req, res) => {
  res.status(200).send({
    data: {
      user: "alex",
    },
  });
});

const createNewUser = (n) => {
  return new Promise((resolve, reject) => {
    resolve({ name: n, user: "guest", ts: Date.now() });
  });
};

app.post("/user", async (req, res) => {
  const { name = "" } = req.body;

  try {
    const newUser = await createNewUser(name);
    res.status(201).send({
      data: {
        ...newUser,
      },
    });
  } catch (e) {
    res.status(500).send({
      data: {
        error: e,
      },
    });
  }
});

app.use((req, res, next) => {
  res.status(404).send("Sorry, this route doesn't exist. Have a nice day :)");
});

const port = process.env.PORT || "8080";

app.listen(port, () => {
  console.log("server is up on " + port);
});
