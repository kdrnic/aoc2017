number = 289326;
odd = 1;
radius = 0;
while(odd * odd < number){
	odd += 2;
	radius++;
}
odd -= 2;
radius--;
x = radius;
y = radius;
dir = 0;
val = odd * odd;
while(val != number){
	x += [1, 0, -1, 0, 1][dir];
	y += [0, -1, 0, 1, 0][dir];
	if(dir == 0 && x == radius + 1) dir++;
	if(dir == 1 && y == -radius - 1) dir++;
	if(dir == 2 && x == -radius - 1) dir++;
	if(dir == 3 && y == radius + 1) dir++;
	val++;
}
console.log(Math.abs(x) + Math.abs(y));
x = 0;
y = 0;
radius = 0;
val = 0;
dir = 0;

IntoChunks = ((a, chunkSize) => a.map((e, i, arr) => i % chunkSize === 0 ? arr.slice(i, i + chunkSize) : null).filter(e => e));

mem = Array(1000000).fill(0);
function Pos(x, y){
	return (x + 500) + (y + 500) * 1000;
}
mem[Pos(x, y)] = 1;
while(val < number){
	console.log(x, y, val);
	x += [1, 0, -1, 0, 1][dir];
	y += [0, -1, 0, 1, 0][dir];
	if(dir == 0 && x == radius + 1) dir++;
	if(dir == 1 && y == -radius - 1) dir++;
	if(dir == 2 && x == -radius - 1) dir++;
	if(dir == 3 && y == radius + 1) dir++;
	if(dir == 4 && x > radius + 1){
		dir = 1;
		radius++;
	}
	val = mem[Pos(x, y)] =
	  mem[Pos(x - 1, y - 1)] + mem[Pos(x - 0, y - 1)] + mem[Pos(x + 1, y - 1)] +
	+ mem[Pos(x - 1, y + 0)]                          + mem[Pos(x + 1, y + 0)]
	+ mem[Pos(x - 1, y + 1)] + mem[Pos(x - 0, y + 1)] + mem[Pos(x + 1, y + 1)];
}
console.log(val);
//console.log(IntoChunks(mem, 1000).join("\n"));