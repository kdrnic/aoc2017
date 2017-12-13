fs = require("fs");
inp = fs.readFileSync("input10.txt").toString();

listSize = 256;
lengths = inp.split(",").map(e => parseInt(e));
list = Array(listSize).fill(0).map((e, i) => i);
curr = 0;
skip = 0;

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

DoRound();

console.log(list[0] * list[1]);

listSize = 256;
lengths = inp.split("").map(e => e.charCodeAt(0)).concat([17, 31, 73, 47, 23]);
list = Array(listSize).fill(0).map((e, i) => i);
curr = 0;
skip = 0;

for(var i = 0; i < 64; i++) DoRound();

sparse = [];
while(list.length) sparse.push(list.splice(0, 16));
sparse = sparse.map(b => b.reduce((acc, e, i, a) => acc ^ e, 0)).map(h => (h < 16 ? "0" : "") + h.toString(16)).join("");
console.log(sparse);