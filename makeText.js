/** Command-line tool to generate Markov text. */

const fs = require("fs");
const axios = require("axios");
const { MarkovMachine } = require("./markov");

function generateTextFromFile(path) {
  fs.readFile(path, "utf-8", (err, data) => {
    if (err) {
      console.error(`Error reading ${path}: ${err}`);
      process.exit(1);
    } else {
      let mm = new MarkovMachine(data);
      console.log(mm.makeText());
    }
  });
}

async function generateTextFromURL(url) {
  try {
    let response = await axios.get(url);
    let mm = new MarkovMachine(response.data);
    console.log(mm.makeText());
  } catch (error) {
    console.error(`Error fetching ${url}: ${err}`);
    process.exit(1);
  }
}

let [method, path] = process.argv.slice(2);

if (method === "file") {
  generateTextFromFile(path);
} else if (method === "url") {
  generateTextFromURL(path);
} else {
  console.error(`Unknown method: ${method}`);
  process.exit(1);
}
