fs = require("fs");
inp = fs.readFileSync("input13.txt").toString();
lines = inp.split("\n").filter(e => e.length).map(l => l.split(": ").map(e => parseInt(e)));

wall = Array(lines.reduce((acc, e, i, a) => Math.max(e[0], acc), 0)).fill(0);
lines.forEach(e => wall[e[0]] = e[1]);

//wall = [3, 2, 0, 0, 4, 0, 4];

//0 1 0 1 0 1 0 1 0
//0-1 0-1 0-1 0-1 0
//1 0 1 0 1 0 1 0 1
 
//0 1 2 1 0 1 2 1 0
//0 1-2-1 0 1-2-1 0
//2 3 0 1 2 3 0 1 2

//0 1 2 3 2 1 0 1 2
//0 1 2-3-2-1 0 1 2
//3 4 5 0 1 2 3 4 5

//0 1 2 3 4 3 2 1 0
//0 1 2 3-4-3-2-1-0 1 2 3
//4 5 6 7 0 1 2 3 4 5 6 7

movement = ( (a,b) => Math.abs( ((a + b - 1) % ((b - 1) * 2)) - b + 1) % b );

function TryToPass(delay){
	var caughtAt = [];
	for(var i = 0; i < wall.length; i++){
		if(wall[i] && (movement(i + delay, wall[i]) == 0) ) caughtAt.push(i);
	}
	return caughtAt;
}

console.log(TryToPass(0).reduce((acc, e, i, a) => acc + wall[e] * e, 0));

for(var d = 0; true; d++){
	if(!TryToPass(d).length){
		console.log(d);
		break;
	}
}