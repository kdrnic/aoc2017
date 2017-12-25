fs = require("fs");
bp = fs.readFileSync("input25.txt").toString() + "\n";

state = bp.match(/Begin in state ([A-Z])\./)[1];
numSteps = parseInt(bp.match(/Perform a diagnostic checksum after ([0-9]+) steps\./)[1]);

tape = Array(numSteps * 2 + 3).fill(0);
cursor = Math.floor(tape.length / 2);

bp = bp.replace(/Begin in state ([A-Z])\./, "//begin in state...");
bp = bp.replace(/Perform a diagnostic checksum after ([0-9]+) steps\.\n/, "//perform a diagnostic...");
bp = bp.replace("In state A:", "if(state == \"A\"){");
bp = bp.replace(/In state ([B-Z]):/g, (a, b) => "else if(state == \"" + b + "\"){");
bp = bp.replace(/\sIf the current value is 0:/g, "if(tape[cursor] == 0){");
bp = bp.replace(/\sIf the current value is 1:/g, "}\nelse{");
bp = bp.replace(/\s- Write the value ([0-1])\./g, (a, b) => "tape[cursor] = " + b + ";");
bp = bp.replace(/\s- Move one slot to the (left|right)\./g, (a, b) => "cursor += " + {left: "-1", right: "1"}[b] + ";");
bp = bp.replace(/\s- Continue with state ([A-Z])\./g, (a, b) => "state = \"" + b + "\";");
bp = bp.replace(/^\n/gm, "}\n}");

Stepper = new Function(bp);

for(var i = 0; i < numSteps; i++) Stepper();

count = tape.reduce((acc, e) => acc + e, 0);
console.log(count);