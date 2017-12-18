steps = 348;
buffer = [0];
pos = 0;
for(var i = 1; i <= 2017; i++){
	pos = ((pos + steps) % buffer.length) + 1;
	buffer.splice(pos, 0, i);
}
console.log(buffer[pos + 1]);

bufferLen = buffer.length;
after0 = buffer[buffer.indexOf(0) + 1];
for(var i = 2018; i <= 50000000; i++){
	pos = ((pos + steps) % bufferLen) + 1;
	if(pos == 1) after0 = i;
	bufferLen++;
}
console.log(after0);
