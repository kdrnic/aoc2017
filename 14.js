fs = require("fs");

key = "jzgqcdpd";

//if(fs.existsSync())

function DoHash(lengths){
	var listSize = 256;
	var list = Array(listSize).fill(0).map((e, i) => i);
	var curr = 0;
	var skip = 0;
	
	if(typeof lengths == "string") lengths = lengths.split("").map(e => e.charCodeAt(0));
	lengths = lengths.concat([17, 31, 73, 47, 23]);
	
	function DoRound(){
		var lengs = lengths.slice();
		while(lengs.length){
			var l = lengs.shift();
			
			var s = list.concat(list).splice(curr, l);
			s.reverse();
			list = list.map((e, i) => ((s[listSize + i - curr] + 1) || (s[i - curr] + 1) || (e + 1)) - 1);
			
			curr += l + skip;
			curr = curr % listSize;
			skip++;
		}
	}
	
	for(var i = 0; i < 64; i++) DoRound();
	
	var sparse = [];
	while(list.length) sparse.push(list.splice(0, 16));
	return sparse.map(b => b.reduce((acc, e, i, a) => acc ^ e, 0));
}

grid = Array(128).fill(key).map((e, i) => e + "-" + i).map(e => DoHash(e));
gridStr = grid.map(e => e.map(n => ("00000000000" + n.toString(2)).substr(-8)).join("")).join("\n");
console.log(gridStr.match(/1/g).length);

grid = gridStr.split("\n").map(l => l.split("").map(c => parseInt(c)));

function FloodFill(firstPos){
	var queue = [];
	
	function PushToQueue(p){
		grid[p[0]][p[1]] = 0;
		queue.push(p);
	}
	
	function CheckGrid(x, y){
		if(x < 0) return 0;
		if(x >= 128) return 0;
		if(y < 0) return 0;
		if(y >= 128) return 0;
		return grid[x][y];
	}
	
	PushToQueue(firstPos);
	
	while(queue.length){
		var pos = queue.shift();
		
		if(CheckGrid(pos[0] - 1, pos[1])) PushToQueue([pos[0] - 1, pos[1]]);
		if(CheckGrid(pos[0] + 1, pos[1])) PushToQueue([pos[0] + 1, pos[1]]);
		if(CheckGrid(pos[0], pos[1] - 1)) PushToQueue([pos[0], pos[1] - 1]);
		if(CheckGrid(pos[0], pos[1] + 1)) PushToQueue([pos[0], pos[1] + 1]);
		//console.log(queue.length);
	}
}

function FindPos(){
	for(var x = 0; x < 128; x++){
		 for(var y = 0; y < 128; y++){
			 if(grid[x][y]) return [x, y];
		 }
	}
	return null;
}

var numGroups, groupPos;
for(numGroups = 0; groupPos = FindPos(); numGroups++){
	FloodFill(groupPos);
}
console.log(numGroups);