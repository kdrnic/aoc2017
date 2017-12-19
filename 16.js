fs = require("fs");
ex = 0;
inp = ex ? "s1,x3/4,pe/b" : fs.readFileSync("input16.txt").toString().split("\n").filter(e => e.length)[0];
dance = inp.split(",");
progsInLine = Array((ex ? "e" : "p").charCodeAt(0) - "a".charCodeAt(0) + 1).fill(0).map((e, i) => String.fromCharCode(i + "a".charCodeAt(0)));
progs = progsInLine.slice();
moves = {
	s: a => progs.unshift.apply(progs, progs.splice(-parseInt(a))),
	x:	(a, b) => progs = progs.map((e, i) => i == parseInt(a) ? progs[parseInt(b)] : i == parseInt(b) ? progs[parseInt(a)] : e),
	p:	(a, b) => progs = progs.map((e, i) => e == a ? b : e == b ? a : e)
};

dance.forEach(m => moves[m[0]](m.substr(1).split("/")[0], m.split("/")[1]));
console.log(progs.join(""));
/*
dance.forEach(m => moves[m[0]](m.substr(1).split("/")[0], m.split("/")[1]));
console.log(2, progs.join(""));
dance.forEach(m => moves[m[0]](m.substr(1).split("/")[0], m.split("/")[1]));
console.log(3, progs.join(""));
dance.forEach(m => moves[m[0]](m.substr(1).split("/")[0], m.split("/")[1]));
console.log(4, progs.join(""));
dance.forEach(m => moves[m[0]](m.substr(1).split("/")[0], m.split("/")[1]));
console.log(5, progs.join(""));
*/
console.time("potato");
progs = progsInLine.slice();
dance.filter(m => m[0] != "p").forEach(m => moves[m[0]](m.substr(1).split("/")[0], m.split("/")[1]));
permutationNoP = progs.map(e => progsInLine.indexOf(e));
progsNoP = progs;
progs = progsInLine.slice();
dance.filter(m => m[0] == "p").forEach(m => moves[m[0]](m.substr(1).split("/")[0], m.split("/")[1]));
permutationOnlyP = progs.slice();
progsOnlyP = progs;
/*
progs = progsInLine.slice();
progs = permutationNoP.map(e => progs[e]);
progs = progs.map(e => permutationOnlyP[progsInLine.indexOf(e)]);
console.log(1, progs.join(""));
progs = permutationNoP.map(e => progs[e]);
progs = progs.map(e => permutationOnlyP[progsInLine.indexOf(e)]);
console.log(2, progs.join(""));
progs = permutationNoP.map(e => progs[e]);
progs = progs.map(e => permutationOnlyP[progsInLine.indexOf(e)]);
console.log(3, progs.join(""));
progs = permutationNoP.map(e => progs[e]);
progs = progs.map(e => permutationOnlyP[progsInLine.indexOf(e)]);
console.log(4, progs.join(""));
progs = permutationNoP.map(e => progs[e]);
progs = progs.map(e => permutationOnlyP[progsInLine.indexOf(e)]);
console.log(5, progs.join(""));
*/

total = 1;
for(var done = 1; done < 1000000000; ){
	permutationNoP = progsNoP.map(e => progsInLine.indexOf(e));
	permutationOnlyP = progsOnlyP.slice();
	for(i = 1; i < 10; i++){
		progsNoP = permutationNoP.map(e => progsNoP[e]);
		progsOnlyP = progsOnlyP.map(e => permutationOnlyP[progsInLine.indexOf(e)]);
		//progs = permutation.map(e => progs[e]);
		total += done;
	}
	done = total;
}
progs = progsInLine.slice();
progs = permutationNoP.map(e => progs[e]);
progs = progs.map(e => permutationOnlyP[progsInLine.indexOf(e)]);
console.log(progs.join(""));

/*
LET THIS IDIOCY BE REMEMBERED:
moves2 = {
	s: a => "progs.unshift.apply(progs, progs.splice(-" + a +"));",
	x:	(a,b) => "temp = progs[" + a + "]; progs[" + a + "] = progs[" + b + "]; progs[" + b + "] = temp;",
	p:	(a,b) => "temp = progs.indexOf(\"" + a + "\"); progs[progs.indexOf(\"" + b + "\")] = \"" + a +"\"; progs[temp] = \"" + b + "\";"
};
danceFuncSrc = dance.map(m => moves2[m[0]](m.substr(1).split("/")[0], m.split("/")[1])).join("");
danceFuncSrc = Array(1).fill(danceFuncSrc).join("");
danceFunc = new Function(danceFuncSrc);
if(ex){
	progs = progsInLine.slice();
	danceFunc();
	console.log(progs.join(""));
}
progs = progsInLine.slice();
for(var done = 0; done < 1000000000; done += 1){
	danceFunc();
	if(done % 10000000 == 0) console.log(Math.floor(done / 10000000) + "%");
}
console.log(progs.join(""));
*/
console.timeEnd("potato");