fs = require("fs");
map = fs.readFileSync("input19.txt").toString().split("\n").filter(e => e.length).map(l => " " + l + " ");
map.push(Array(map[0].length).fill(" ").join(""));
y = 0;
x = map[0].indexOf("|");
dir = 2;
dirDx = [0, 1, 0, -1];
dirDy = [-1, 0, 1, 0];
lettersSeen = [];
steps = 0;
while(map[y][x] != " "){
	steps++;
	y += dirDy[dir];
	x += dirDx[dir];
	if(map[y][x] == "+"){
		possibleDirs = Array(4).fill(0).map((e, i) => map[y + dirDy[i]][x + dirDx[i]] != " ");
		possibleDirs[(dir + 2) % 4] = false;
		dir = possibleDirs.indexOf(true);
	}
	if(/^[A-Z]$/.test(map[y][x])) lettersSeen.push(map[y][x]);
}
console.log(lettersSeen.join(""));
console.log(steps);