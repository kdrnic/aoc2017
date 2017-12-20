fs = require("fs");
console.time("potato");
inp = fs.readFileSync("input20.txt").toString().split("\n").filter(e => e.length);
particles = inp.map((l, i) => JSON.parse("{" + l.replace(/</g, "[").replace(/>/g, "]").replace(/=/g, ":").replace(/p/g, "\"p\"").replace(/v/g, "\"v\"").replace(/a/g, "\"a\"") + ", \"index\": " + i + "}"));
Manhattan = p => Math.abs(p.p[0]) + Math.abs(p.p[1]) + Math.abs(p.p[2]);
PSort = (p1, p2) => Manhattan(p1) - Manhattan(p2);
VSum = (v1, v2) => [v1[0] + v2[0], v1[1] + v2[1], v1[2] + v2[2]];
Update = p => (p.v = VSum(p.v, p.a), p.p = VSum(p.p, p.v));
PColl = (p1, p2) => (p1.p[0] == p2.p[0]) && (p1.p[1] == p2.p[1]) && (p1.p[2] == p2.p[2]);
for(var i = 0; i < 1000; i++){
	particles.forEach(Update);
	for(var j = 0; j < particles.length; j++){
		for(var k = j + 1; k < particles.length; k++){
			if(j == k) continue;
			if(PColl(particles[j], particles[k])) particles[j].collided = particles[k].collided = true;
		}
	}
}
pSorted = particles.sort(PSort);
console.log(pSorted.shift().index);
particles = particles.filter(p => !p.collided);
console.log(particles.length);
console.timeEnd("potato");
