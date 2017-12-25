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
	RotCw = (x, y, s) => [s - y - 1, x, s],		//rotcw
	RotCw2 = (x, y, s) => RotCw.apply(null, RotCw(x, y, s)), // rotcw twice
	RotCw3 = (x, y, s) => RotCw.apply(null, RotCw.apply(null, RotCw(x, y, s))),  //rotcw thrice
	Vflip = (x, y, s) => [s - x - 1, y, s], // vflip
	Hflip = (x, y, s) => [x, s - y - 1, s], // hflip
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
			var v = p[m[x + y * s]];
			var _x = op(x, y, s)[0];
			var _y = op(x, y, s)[1];
			var idx = _x + _y * s;
			if((idx >= m.length) || ((v != ".") && (v != "#")) || (!v)) console.log("error", idx, _x, _y, s, v);
			res = res.substr(0, m[idx]) + v + res.substr(m[idx] + 1);
		}
	}
	return res;
}

function GenOps(p, s){
	var arr = ops.map(o => ApplyOp(p, s, o));
	return arr;
}

function Reconstitute(nps, s){
	var m = [null, null, null, [0, 1, 2, 4, 5, 6, 8, 9, 10], [0, 1, 2, 3, 5, 6, 7, 8, 10, 11, 12, 13, 15, 16, 17, 18]][s];
	var res = "";
	for(var y = 0; y < size; y++){
		var yr = y % s;
		
		if(y) res += "/";
		for(var x = 0; x < size; x++){
			var xr = x % s;
			var idx = Math.floor(x / s) + Math.floor(y / s) * (size / s);
			if(!nps[idx]) console.log(nps, idx);
			res += nps[idx][m[xr + yr * s]];
		}
	}
	return res;
}

for(var i = 0; i < 18; i++){
	console.time(i);
	var s = 0;
	if(size % 2 == 0) s = 2;
	else if(size % 3 == 0) s = 3;
	var nps = [];
	
	//console.log("          ", i, size, s);
	
	for(var y = 0; y < size / s; y++){
		for(var x = 0; x < size / s; x++){
			var np = Extract(x * s, y * s, s);
			var bk = GenOps(np, s).filter(p => book.has(p))[0];
			if(!bk) console.log(np, GenOps(np,s));
			nps.push(book.get(bk));
		}
	}
	
	if(s == 2){
		size = (size / s) * 3;
		s = 3;
	}
	else if(s == 3){
		size = (size / s) * 4;
		s = 4;
	}
	
	pattern = Reconstitute(nps, s);
	
	if(i + 1 == 5) console.log(pattern.match(/#/g).length);
	if(i + 1 == 18) console.log(pattern.match(/#/g).length);
	
	console.timeEnd(i);
}
//console.log(pattern.replace(/\//g, "\n"));