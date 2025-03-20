const { write, writeFileSync } = require("fs");
const http = require("http");
const fs = require("fs");
var StringDecoder = require("string_decoder").StringDecoder;

const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");
  let body = "";
  req.on("data", function (data) {
    body += decode.write(data);
  });
  req.on("end", function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split("&");
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split("=");
      resultHash[partArray[0]] = partArray[1];
    });
    callback(resultHash);
  });
};




// here, you can change the form below to modify the input fields and what is displayed.
// This is just ordinary html with string interpolation.
const form = () => {
  return `
  <body style="background-color: ${color};">
  <p>${item}</p>
  <form method="POST">
  <input name="item" placeholder="Enter text"></input>
  <input name="color" type="text" placeholder="Enter color (e.g., red, #ff0000)"></input>
  <button type="submit">Submit</button>
  </form>

  <script>
    document.body.style.backgroundColor = "${color}";
   </script>
  </body>
  `;
};

// here, you could declare one or more variables to store what comes back from the form.
let item = "Enter color below.";
let color = "#ffffff"

let saveInput = (data) => {
  let dataToSave = `Item: ${data.item}\n`

  fs.readFile('./formData.txt', 'utf8', (err, existingData) => {
    if (err && err.code !== 'ENOENT') {
      console.error("Error reading file:", err);
      return;
    }

    const updatedData = (existingData || '') + dataToSave;

    fs.writeFile('./temporary/formData.txt', updatedData, 'utf8', (err) => {
      if (err) {
        console.error("Error writing to file:", err);
      } else {
        console.log("Data saved successfully.");
      }
    });
  });
};

const server = http.createServer((req, res) => {
  console.log("req.method is ", req.method);
  console.log("req.url is ", req.url);
  if (req.method === "POST") {
    getBody(req, (body) => {
      item = body["item"] || "Nothing was entered.";
      color = body["color"] || "#ffffff";

      saveInput(body);

      console.log("The body of the post is ", body);
      // here, you can add your own logic
      if (body["item"]) {
        item = body["item"];
      } else {
        item = "Nothing was entered.";
      }
      // Your code changes would end here
      res.writeHead(303, {
        Location: "/",
      });
      res.end();
    });
  } else {
    res.end(form());
  }
});

server.listen(3000);
console.log("The server is listening on port 3000.");