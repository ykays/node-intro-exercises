const fs = require("fs");
const process = require("process");
const axios = require("axios");

let path = "";
let out = "";

if (process.argv[2] === "--out") {
  out = process.argv[3];
  path = process.argv[4];
} else {
  path = process.argv[2];
}

if (path.startsWith("http")) {
  webCat(path, out);
} else {
  cat(path, out);
}

function cat(path, out) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.log(`Error reading ${path}`, err);
      process.exit(1);
    }
    processData(data, out);
  });
}

async function webCat(url, out) {
  try {
    let resp = await axios.get(url);
    processData(resp.data, out);
  } catch (e) {
    console.log(`Error fetching ${url}`, e);
    process.exit(1);
  }
}

function processData(data, out) {
  if (out) {
    fs.writeFile(out, data, "utf8", function (err) {
      if (err) {
        console.log(`Couldn't write ${out}: ${err}`);
        process.exit(1);
      }
    });
  } else {
    console.log(data);
  }
}
