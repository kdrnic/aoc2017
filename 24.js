fs = require("fs");
inp = fs.readFileSync("input24.txt").toString().split("\n").filter(e => e.length);
comps = inp.map(l => l.split("/").map(n => parseInt(n)));

queue = [{p: [0], c: comps, w: 0}];

bridges = [];
it = 0;
interv = 1000;
console.time("" + (it + interv));
while(queue.length){
	var b = queue.shift();
	
	if(b.p.length + b.c.length - 1 != comps.length){
		console.log(b);
		process.exit();
	}
	if(it % interv == 0){
		var oldQl = queue.length;
		//FilterQueue();
		console.log(queue.length, oldQl - queue.length, bridges.length);
		console.timeEnd("" + (it));
		console.time("" + (it + interv));
	}
	it++;
	
	var port = b.p[b.p.length - 1];
	var cs = b.c.filter(c => c.includes(port));
	if(!cs.length){
		bridges.push(b);
		continue;
	}
	var newQs = cs.map(function(e, i){
		var newSeg = {
			p: b.p.slice(),
			c: b.c.slice(),
			w: b.w + e[0] + e[1]
		}
		newSeg.p.push(e[0] == port ? e[1] : e[0]);
		newSeg.c.splice(newSeg.c.indexOf(e), 1);
		return newSeg;
	});
	queue = queue.concat(newQs);
}
bridges.sort((a, b) => a.w - b.w);
console.log(bridges.shift().w, bridges.pop().w);
/*
function CompSort(a, b){
	var x = a.slice();
	var y = b.slice();
	if(x[0] > x[1]) x.reverse();
	if(y[0] > y[1]) y.reverse();
}

function BridgeEq(a, b){
	if(a.p[a.p.length - 1] != b[b.p.length - 1]) return false;
	var ca = a.c.slice().sort(CompSort);
	var cb = b.c.slice().sort(CompSort);
	if(JSON.stringify(ca) != JSON.stringify(cb)) return false;
	return true;
}

function FilterQueue(){
	var newQueue = [];
	for(var i = 0; i < queue.length; i++){
		var j;
		for(j = 0; j < newQueue.length; j++){
			if(BridgeEq(queue[i], newQueue[j])) break;
		}
		if(j == newQueue.length) newQueue.push(queue[i]);
	}
	queue = newQueue;
}
*/