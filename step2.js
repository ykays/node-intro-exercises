const fs = require("fs");
const process = require("process");
const axios = require("axios");

function cat(path) {
  if (path.startsWith("http")) {
    return webCat(path);
  }

  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.log(`Error reading ${path}`, err);
      process.exit(1);
    }
    console.log(data);
  });
}

async function webCat(url) {
  try {
    let resp = await axios.get(url);
    console.log(resp.data);
  } catch (e) {
    console.log(`Error fetching ${url}`, e);
    process.exit(1);
  }
}

cat(process.argv[2]);
