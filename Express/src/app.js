const express = require("express");

const app = express();

const api = [
  {
    address: "Kolkata",
    forecast: "Autumn",
  },
  {
    address: "London",
    forecast: "Winter",
  },
];



app.get("", (req, res) => {
  res.send("Hello Express !");
});

app.get("/help", (req, res) => {
  res.send("Help Section!");
});

app.get("/about", (req, res) => {
  res.send("About Section!");
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address not provided",
    });
  }
  res.send(api.find(ele=>ele.address===req.query.address))
});

app.get("/users", (req, res) => {
  res.send([
    {
      id: 1,
      name: "Leanne Graham",
      username: "Bret",
      email: "Sincere@april.biz",
      address: {
        street: "Kulas Light",
        suite: "Apt. 556",
        city: "Gwenborough",
        zipcode: "92998-3874",
        geo: {
          lat: "-37.3159",
          lng: "81.1496",
        },
      },
      phone: "1-770-736-8031 x56442",
      website: "hildegard.org",
      company: {
        name: "Romaguera-Crona",
        catchPhrase: "Multi-layered client-server neural-net",
        bs: "harness real-time e-markets",
      },
    },
    {
      id: 2,
      name: "Ervin Howell",
      username: "Antonette",
      email: "Shanna@melissa.tv",
      address: {
        street: "Victor Plains",
        suite: "Suite 879",
        city: "Wisokyburgh",
        zipcode: "90566-7771",
        geo: {
          lat: "-43.9509",
          lng: "-34.4618",
        },
      },
      phone: "010-692-6593 x09125",
      website: "anastasia.net",
      company: {
        name: "Deckow-Crist",
        catchPhrase: "Proactive didactic contingency",
        bs: "synergize scalable supply-chains",
      },
    },
    {
      id: 3,
      name: "Clementine Bauch",
      username: "Samantha",
      email: "Nathan@yesenia.net",
      address: {
        street: "Douglas Extension",
        suite: "Suite 847",
        city: "McKenziehaven",
        zipcode: "59590-4157",
        geo: {
          lat: "-68.6102",
          lng: "-47.0653",
        },
      },
      phone: "1-463-123-4447",
      website: "ramiro.info",
      company: {
        name: "Romaguera-Jacobson",
        catchPhrase: "Face to face bifurcated interface",
        bs: "e-enable strategic applications",
      },
    },
  ]);
});
app.get("/products", (req, res) => {
  console.log(req.query.search);
  if (!req.query.search) {
    return res.send({
      error: "Not found",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/html", (req, res) => {
  res.send("<h1>I am H1 tag</h1>");
});

app.get("*", (req, res) => {
  res.send("Error 404");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
