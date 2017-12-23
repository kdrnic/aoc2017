fs = require("fs");
inp = fs.readFileSync("input23.txt").toString().split("\n").filter(e => e.length);
prog = inp.map(l => l.split(/\s/g));
registers = {};
GetVal = a => "abcdefgh".indexOf(a) >= 0 ? (registers[a] | 0) : parseInt(a);
frequency = 0;
instrSet = {
	set: (x, y) => (registers[x] = GetVal(y), 1),
	sub: (x, y) => (registers[x] -= GetVal(y), 1),
	mul: (x, y) => (mulCount++, registers[x] *= GetVal(y), 1),
	jnz: (x, y) => (GetVal(x) != 0) ? GetVal(y) : 1,
};
pc = 0;
mulCount = 0;
clock = 0;

while(pc >= 0 && pc < prog.length){
	pc += instrSet[prog[pc][0]](prog[pc][1], prog[pc][2]);
	clock++;
}
console.log("// part 1: " + mulCount + "\n");

instrSet = {
	set: (x, y, pc) => ("" + x + " = " + y + ";\n"),
	sub: (x, y, pc) => ("" + x + " -= " + y + ";\n"),
	mul: (x, y, pc) => ("" + x + " *= " + y + ";\n"),
	jnz: (x, y, pc) => ("if(" + x + " != 0) goto label" + (pc + parseInt(y)) + ";\n"),
};

labelPcs = [];
for(var i = 0; i < prog.length; i++){
	if(prog[i][0] == "jnz"){
		labelPcs.push(i + parseInt(prog[i][2]));
	}
}
cpp = "#include <stdio.h>\nint main(int argc, char **argv){\n    long int a = 1;\n    long int b = 0, c = 0, d = 0, e = 0, f = 0, g = 0, h = 0;\n"
for(var i = 0; i < prog.length; i++){
	if(labelPcs.indexOf(i) >= 0) cpp += "label" + i + ":   ";
	else cpp += "    ";
	cpp += instrSet[prog[i][0]](prog[i][1], prog[i][2], i);
}
cpp += "label" + i + ":   ";
cpp += "    printf(\"%d\", h);\nreturn 0;\n}\n";
console.log(cpp);