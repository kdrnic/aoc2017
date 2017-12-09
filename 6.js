data = [4, 1, 15, 12, 0, 9, 9, 5, 5, 8, 7, 3, 14, 5, 12, 3];
iterations = 0;
seen = new Set();
function Update(){
	var maxI = data.reduce((acc, v, i) => (data[acc] >= v) ? acc : i, 999);
	var val = data[maxI];
	data[maxI] = 0;
	for(var i = (maxI + 1) % data.length; val > 0; val--, i = (i + 1) % data.length) data[i]++;
	return "_" + data.join("A");
}

seen.add(r = "_" + data.join("_"));
while(!seen.has(r = Update())) seen.add(r);
console.log(seen.size);
seen = new Set();
while(!seen.has(r = Update())) seen.add(r);
console.log(seen.size);