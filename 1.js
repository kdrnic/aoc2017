fs = require("fs");
inp = fs.readFileSync("input1.txt").toString().split("").filter(c => "0123456789".indexOf(c) != -1);
console.log(inp.filter((e, i, a) => e == a[(i + 1) % a.length]).map(c => parseInt(c)).reduce((a, b) => a + b));
console.log(inp.filter((e, i, a) => e == a[(i + (a.length) / 2) % a.length]).map(c => parseInt(c)).reduce((a, b) => a + b));