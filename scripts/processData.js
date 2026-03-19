import fs from "fs";

const text = fs.readFileSync("vansh_data.txt", "utf-8");

// simple chunking
const chunkSize = 300;

const chunks = [];
for (let i = 0; i < text.length; i += chunkSize) {
  chunks.push(text.slice(i, i + chunkSize));
}

fs.writeFileSync("chunks.json", JSON.stringify(chunks, null, 2));

console.log("Chunks created:", chunks.length);