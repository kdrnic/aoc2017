fs = require("fs");
inp = fs.readFileSync("input4.txt").toString();
inp = inp.split("\n").filter(lin => lin.length);
console.log(inp.filter(lin => (new Set(lin.split(" "))).size == lin.split(" ").length).length);
console.log(inp.filter(lin => (new Set(lin.split(" ").map(wrd => wrd.split("").sort().join() ))).size == lin.split(" ").length).length);