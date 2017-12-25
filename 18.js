fs = require("fs");
ex = 0;
inp = fs.readFileSync("input18.txt").toString().split("\n").filter(e => e.length);
prog = inp.map(l => l.split(" "));
registers = {};
GetVal = a => registers[a] || parseInt(a);
frequency = 0;
sounds = [];
oldClock = 0;
instrSet = {
	snd: function(x){
		if(frequency){
			sounds.push([frequency, clock - oldClock]);
		}
		frequency = GetVal(x);
		return 1;
	},
	set: (x, y) => (registers[x] = GetVal(y), 1),
	add: (x, y) => (registers[x] += GetVal(y), 1),
	mul: (x, y) => (registers[x] *= GetVal(y), 1),
	mod: (x, y) => (registers[x] = registers[x] % GetVal(y), 1),
	rcv: x => (GetVal(x) > 0) ? (console.log(frequency), -999) : 1,
	jgz: (x, y) => (GetVal(x) > 0) ? GetVal(y) : 1,
};
clock = 0;
pc = 0;
while(pc >= 0 && pc < prog.length){
	pc += instrSet[prog[pc][0]](prog[pc][1], prog[pc][2]);
	clock++;
}

if(frequency){
	sounds.push([frequency, clock - oldClock]);
}
fs.writeFileSync("./18.json", JSON.stringify(sounds));

instrSet["snd"] = x => (thread.push(GetVal(x)), sent[pid]++, 1);
instrSet["rcv"] = x => otherThread.length > 0 ? (registers[x] = otherThread.shift(), 1) : 0;

thread0 = [];
thread1 = [];
pc0 = 0;
pc1 = 0;
registers0 = {p: 0};
registers1 = {p: 1};
sent = [0, 0];
stillCount = 0;
while(true){
	thread = thread0;
	otherThread = thread1;
	registers = registers0;
	pid = 0;
	pc0 += (move0 = instrSet[prog[pc0][0]](prog[pc0][1], prog[pc0][2]));
	
	thread = thread1;
	otherThread = thread0;
	registers = registers1;
	pid = 1;
	pc1 += (move1 = instrSet[prog[pc1][0]](prog[pc1][1], prog[pc1][2]));
	
	if(Math.abs(move0) + Math.abs(move1) == 0) stillCount++;
	if(stillCount > 99) break;
}
console.log(sent[1]);