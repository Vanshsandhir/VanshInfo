import { ask } from "./ask.js";

async function test() {
  try {
    const response = await ask("Who is Vansh?");
    console.log("FINAL ANSWER:\n", response);
  } catch (err) {
    console.error("ERROR:", err);
  }
}

test();