fs = require("fs");
inp = fs.readFileSync("input22.txt").toString();
//inp = "..#\n#..\n...";
inp = inp.split("\n").filter(e => e.length);
grid = inp.map(l => l.split(""));

ext = 2000;
tmp = Array(grid[0].length).fill(".");
for(var i = 0; i < ext; i++){
	grid.push(tmp.slice());
	grid.unshift(tmp.slice());
}
tmp = Array(ext).fill(".");
grid = grid.map(l => tmp.concat(l).concat(tmp));

copy = JSON.stringify(grid);

Output = a => console.log(grid.map((l, x_) => l.map((c, y_) => (x == x_ && y == y_) ? "[" + c + "]" : " " + c + " ").join("")).join("\n"));
//Output();
//console.log(grid.length, grid[0].length);

dy = [0, 1, 0, -1];
dx = [-1, 0, 1, 0];
x = Math.floor(grid.length / 2);
y = Math.floor(grid[0].length / 2);
//console.log(x, y);
dir = 0;
infs = 0;
for(var i = 0; i < 10000; i++){
	if(grid[x][y] == "#"){
		dir = (dir + 1) % 4;
	}
	else {
		dir = (dir + 3) % 4;
		infs++;
	}
	grid[x][y] = (grid[x][y] == "#") ? "." : "#";
	x += dx[dir];
	y += dy[dir];
}
console.log(infs);

grid = JSON.parse(copy);
x = Math.floor(grid.length / 2);
y = Math.floor(grid[0].length / 2);
dir = 0;
infs = 0;

ns = {".": "W", "W": "#", "#": "F", "F": "."};
nd = {".": 3, "W": 0, "#": 1, "F": 2};

for(var i = 0; i < 10000000; i++){
	old = grid[x][y];
	dir = (dir + nd[old]) % 4;
	grid[x][y] = ns[old];
	if(grid[x][y] == "#") infs++;
	x += dx[dir];
	y += dy[dir];
}
console.log(infs);
//Output();