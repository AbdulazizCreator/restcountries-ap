const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Abdulaziz Programmer");
});

app.get("*", async (req, res) => {
  const endpoint = "https://restcountries.com/v3.1";
  let response = await fetch(endpoint + req.url.split("?")[0]);
  let data = await response.json();

  let {
    query: { page, limit = 10 },
  } = req;

  console.log(page);
  console.log(limit);

  if (page) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    results.results = data.slice(startIndex, endIndex);
    results.total = data.length;

    res.send(results);
  } else {
    res.send(data);
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
