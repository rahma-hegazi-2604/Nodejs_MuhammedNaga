//local server => request & response
// Developmant Mode => install packages => fake data  //devDependencies
// Production Mode => Express   //dependencies

//const http = require('http'); //commonJS Module (Default)

import * as http from "http"; //ES module

const server = http.createServer((req, res) => {
  // routing
  if (req.url === "/products") {
    //http://localhost:5000/products
    res.writeHead(200, { "Content-Type": "application/json" });
    // res.write('<div style="background-color:yellow, width:fit-content">');
    // res.write('<h1 style="color:blue;">Hi, there!</h1>');
    // res.write('</div>');
    const Data = {
      products: [
        { id: 1, name: "iphone", price: 10000 },
        { id: 2, name: "samsung", price: 20000 },
        { id: 3, name: "oppo", price: 30000 },
        { id: 4, name: "vivo", price: 40000 },
      ],
    };
    res.write(JSON.stringify(Data));
    res.end();
  } else if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Welcome to our website</h1>");
  } else if (req.url === "/products/new") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`<html>
        <head>
        <title>Add New Product</title>
        </head>
        <body>
        <h2>Add New Product</h2>
        <form method="post" action="/add-product">
            <label for="name">Product Name:</label><br>
            <input type="text" id="name" name="name" required><br><br>
            <label for="description">Description:</label><br>
            <textarea type="text" id="description" name="description" required></textarea><br><br>
            <button type="submit">Add Product</button>
</form> 
</body>
</html>`);
    res.end();

    // HTTP method (Post) && Route => /add-product
  } else if (req.method === "POST" && req.url === "/add-product") {
    // Data => Request(req)
    // name=my+title+&description=my+description
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    // parsing data
    req.on("end", () => {
      const data = new URLSearchParams(body);
      const name = data.get("name");
      const description = data.get("description");

      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(`<dev>
            <h1>Product added successfully</h1>
            <h2>Product Name: ${name}</h2>
            <h2>Description: ${description}</h2>
            </dev>`);
      res.end();
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>Not found</h1>");
  }
});

// Client (Browser) => Local server => Response => Hi,there

//URL => http://localhost:5000 => Browser => compile => JavaScript
const Port = 5000;

server.listen(Port, () => {
  console.log(`Server running at => http://localhost:${Port}`);
});
