fs = require("fs");
inp = fs.readFileSync("input11.txt").toString().split(",").map(s => s.trim());

dirs = {
	ne: [0.5, -0.5],
	se: [0.5, 0.5],
	nw: [-0.5, -0.5],
	sw: [-0.5, 0.5], 
	n: [0, -1],
	s: [0, 1]
};

x = 0;
y = 0;

function Dist(x, y){
	x = Math.abs(x);
	y = Math.abs(y);
	if(x > y) return (y / 0.5) + (x - y) * 0.5;
	return (y - (x / 0.5) * 0.5) + (x / 0.5);
} 

furthest = -1;

inp2 = inp.slice();
while(inp2.length){
	var d = inp2.shift();
	d2 = dirs[d];
	x += d2[0];
	y += d2[1];
	if(Dist(x, y) > furthest) furthest = Dist(x, y);
}

console.log(Dist(x, y));
console.log(furthest);