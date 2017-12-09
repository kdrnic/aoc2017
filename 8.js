fs = require("fs");
inp = fs.readFileSync("input8.txt").toString();
inp = inp.split("\n");
regs = {};
comps = new Map(["==", "<", ">", "<=", ">=", "!="].map(e=>[e, new Function("a", "b", "return a" + e + "b")]));
ops = new Map([["inc", function(a,b){return a + b}], ["dec", function(a,b){return a - b}]]);
vals = [];
for(var i = 0; i < inp.length; i++){
	var lin = inp[i].split(" ");
	if(lin.length < 6) break;
	console.log(lin);
	if(comps.get(lin[5])(regs[lin[4]] | 0, parseInt(lin[6]))) vals.push(regs[lin[0]] = ops.get(lin[1])(regs[lin[0]] | 0, parseInt(lin[2])));
}
console.log(regs);
regarr = [];
for(name in regs){
	regarr.push({name: name, val: regs[name]});
}
function ValSort(a, b){
	return a.val - b.val;
}
regarr.sort(ValSort);
console.log(regarr.shift(), regarr.pop());
vals.sort((a,b)=>a-b);
console.log(vals.shift(), vals.pop());
