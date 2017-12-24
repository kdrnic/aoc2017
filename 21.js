fs = require("fs");
inp = fs.readFileSync("input21.txt").toString().split("\n").filter(e => e.length);
book = new Map(inp.map(l => l.split(" => ")));
pattern = ".#./..#/###";
size = 3;
function Extract(x, y, s){
	var res = "";
	for(var _y = y, j = 0; _y < y + s; _y++, j++){
		var line = pattern;
		for(var i = 0; i < _y; i++) line = line.match(/[\.#]+\/(.*)/)[1];
		if(j) res += "/";
		res += line.substr(x, s);
	}
	return res;
}
ops = [
	RotCw = (x, y, s) => [s - y, x, s],		//rotcw
	RotCw2 = (x, y, s) => RotCw.apply(null, RotCw(x, y, s)), // rotcw twice
	RotCw3 = (x, y, s) => RotCw.apply(null, RotCw.apply(null, RotCw(x, y, s))),  //rotcw thrice
	Vflip = (x, y, s) => [s - x, y, s], // vflip
	Hflip = (x, y, s) => [x, s - y, s], // hflip
	Id = (x, y, s) => [x, y, s],
	RotV = (x, y, s) => RotCw.apply(null, Vflip(x, y, s)),
	RotV2 = (x, y, s) => RotCw2.apply(null, Vflip(x, y, s)),
	RotV3 = (x, y, s) => RotCw3.apply(null, Vflip(x, y, s))
];
function ApplyOp(p, s, op){
	var m = [null, null, [0, 1, 3, 4], [0, 1, 2, 4, 5, 6, 8, 9, 10]][s];
	var res = [null, null, "  /  ", "   /   /   "][s];
	for(var x = 0; x < s; x++){
		for(var y = 0; y < s; y++){
			var v = p[m[x + y * n]];
			var _x = op(x, y, s)[0];
			var _y = op(x, y, s)[1];
			res[m[_x + _y * n]];
		}
	}
}
function GenOps(p, s){
	var arr = ops.map(o => ApplyOp(p, s, o));
	return arr;
}
for(var i = 0; i < 5; i++){
	var s = 0;
	if(size % 2 == 0) s = 2;
	if(size % 3 == 0) s = 3;
	for(var y = 0; y < size / s; y++){
		for(var x = 0; x < size / s; x++){
		}
	}
}
console.log(pattern.match(/#/g).length);