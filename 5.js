fs = require("fs");
inp = fs.readFileSync("input5.txt").toString();
inp = inp.split("\n").filter(lin=>lin.length).map(lin=>parseInt(lin));
inpCopy = inp.slice();
pc = 0;
steps = 0;
while(pc >= 0 && pc < inp.length){
	pc += inp[pc]++;
	steps++;
}
console.log(steps);
inp = inpCopy;
pc = 0;
steps = 0;
while(pc >= 0 && pc < inp.length){
	var move = inp[pc];
	if(move >= 3) inp[pc]--;
	else inp[pc]++;
	pc += move;
	steps++;
}
console.log(steps);