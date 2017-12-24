fs = require("fs");
inp = fs.readFileSync("input24.txt").toString().split("\n").filter(e => e.length);
comps = inp.map(l => l.split("/").map(n => parseInt(n)));

// Sorts a component
Func = (a, b) => a[0] == b ? [a[0], a[1]] : [a[1], a[0]];
// Gets the last added component
Func3 = a => a.p[a.p.length - 1];
// Gets the second last added component's port, or 0
Func5 = a => a.p.length >= 2 ? a.p[a.p.length - 2] : 0;
// Copies into a component
function Func4(a, b){
	a[0] = b[0];
	a[1] = b[1];
}

queue = comps.filter(c => c.includes(0)).map(c => ({p: [c], c: comps.slice()}));

// Removes the used component from the list of components, sort the used component
function Func2(qq){
	qq.forEach(q => q.c.splice(q.c.indexOf(Func3(q)), 1));
	qq.forEach(q => Func4(Func3(q), Func(Func3(q), Func5(q))));
}
Func2(queue);
console.log(queue);
bridges = [];
it = 0;
while(queue.length){
	var b = queue.shift();
	
	if(b.p.length + b.c.length != comps.length){
		console.log(b);
		process.exit();
	}
	if(it++ % 1000 == 0) console.log(queue.length, bridges.length);
	
	var port = b.p[b.p.length - 1][1];
	var cs = b.c.filter(c => c.includes(port));
	if(!cs.length){
		bridges.push(b);
		continue;
	}
	cs = cs.map(c => Func(c, port));
	var newQs = cs.map(c => ({p: b.p.concat([c]), c: b.c.slice()}));
	Func2(newQs);
	queue = queue.concat(newQs);
}
