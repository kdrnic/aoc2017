fs = require("fs");
inp = fs.readFileSync("input2.txt").toString();
inp = inp.split("\n").filter(lin => lin.length);
inp = inp.map(lin => lin.split(/\s/).map(n => parseInt(n)));
console.log(inp.map(lin => Math.max.apply(Math, lin) - Math.min.apply(Math, lin)).reduce((a, b) => a + b, 0));
console.log(inp.map(lin => lin.filter((n1, i1) => lin.filter((n2, i2) => i1 == i2 ? false : n1 % n2 ? (n2 % n1 ? false : true) : true).length).sort((a, b) => a - b)).map(lin => lin[1] / lin[0]).reduce((a, b) => a +b));