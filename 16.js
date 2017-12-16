fs = require("fs");
ex = 0;
inp = ex ? "s1,x3/4,pe/b" : fs.readFileSync("input16.txt").toString().split("\n").filter(e => e.length)[0];
dance = inp.split(",");
progsInLine = Array((ex ? "e" : "p").charCodeAt(0) - "a".charCodeAt(0) + 1).fill(0).map((e, i) => String.fromCharCode(i + "a".charCodeAt(0)));
progs = progsInLine.slice();
moves = {
	s: a => progs.unshift.apply(progs, progs.splice(-parseInt(a))),
	x:	(a,b) => progs = progs.map((e, i) => i == parseInt(a) ? progs[parseInt(b)] : i == parseInt(b) ? progs[parseInt(a)] : e),
	p:	(a,b) => progs = progs.map((e, i) => e == a ? b : e == b ? a : e)
};
dance.forEach(m => moves[m[0]](m.substr(1).split("/")[0], m.split("/")[1]));
console.log(progs.join(""));

total = 1;

for(var done = 1; done < 1000000000; ){
	permutation = progs.map(e => progsInLine.indexOf(e));
	for(i = 1; i < 10; i++){
		progs = permutation.map(e => progs[e]);
		total += done;
		console.log(total, progs.join(""));
	}
	done = total;
}