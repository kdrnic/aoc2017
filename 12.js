fs = require("fs");
inp = fs.readFileSync("input12.txt").toString();
lines = inp.split("\n").filter(e => e.length).map(l => l.replace("<->", ",").replace(/\s/g,"").split(",").map(e => parseInt(e)));

groups = 0;
ms = [];
while(lines.length){
	s = [];
	toAdd = [lines.shift()[0]];
	while(toAdd.length){
		newToAdd = lines.filter(l => (!toAdd.includes(l[0])) && (!s.includes(l[0])) && l.slice(1).filter(e => toAdd.includes(e)).length).map(l => l[0]);
		s = s.concat(toAdd);
		toAdd = newToAdd;
	}
	if(!groups) console.log(s.length);
	ms = ms.concat(s);
	lines = lines.filter(l => !ms.includes(l[0]));
	groups++;
}
console.log(groups);