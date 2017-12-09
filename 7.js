fs = require("fs");
inp = fs.readFileSync("input7.txt").toString();
inp = inp.split("\n");
inp = inp.map(line => line.split(/\s+|->|\)|\(|,/).filter(w => w.length));
progs = new Map();
for(var i = 0; i < inp.length; i++){
	var line = inp[i];
	if(line.length < 2) continue;
	progs.set(line[0], {w: parseInt(line[1]), children: line.slice(2).map(n => progs.has(n) ? progs.get(n) : n), TotalWeight: function(){
		return (this.totalW = this.w + this.children.reduce((acc, cv) => acc + cv.TotalWeight(), 0));
	}});
}
var potato = true;
while(potato){
	potato = false;
	progs.forEach(function(p){
		p.children = p.children.map(n => typeof n == "object" ? n : progs.has(n) ? progs.get(n) : (potato = true, n));
		p.children.filter(c => typeof c == "object").forEach(c => c.parent = p);
	});
}
abraham = null;
tops = [];
progs.forEach(function(p, k){
	p.name = k;
	if(!p.parent){
		abraham = p;
	}
	if(!p.children.length) tops.push(p);
});
console.log(abraham.name);
function WeightSort(a,b){
	return a.TotalWeight() - b.TotalWeight();
}
pick = abraham;
goodWeight = 0;
while(true){
	curr = pick.children.slice();
	curr.sort(WeightSort);	
	if(curr.length < 3) break;
	if(curr[0].TotalWeight() == curr[curr.length - 1].TotalWeight()) break;
	pick = (curr[0].TotalWeight() == curr[1].TotalWeight()) ? curr.pop() : curr[0];
	goodWeight = curr[1].TotalWeight() - pick.TotalWeight();
}
console.log(pick.w + goodWeight);