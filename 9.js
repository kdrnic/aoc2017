fs = require("fs");
inp = fs.readFileSync("input9.txt").toString();
regexp = /<([^!>]|!.)*>/;
inp = inp.slice();
garbCount = 0;
while(inp.search(regexp) >= 0){
	var oldLen = inp.length;
	var garb = inp.match(regexp)[0];
	inp = inp.replace(garb, "");
	garb = garb.slice(1, -1);
	garb = garb.replace(/!./g, "");
	garbCount += garb.length;
}
count = 0;
val = 0;
for(var i = 0; i < inp.length; i++){
	switch(inp[i]){
		case "{":
			count++;
			break;
		case "}":
			val += count;
			count--;
			break;
	}
}
console.log(val);
console.log(garbCount);