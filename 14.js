key = "jzgqcdpd";

function DoHash(lengths){
	var listSize = 256;
	var list = Array(listSize).fill(0).map((e, i) => i);
	var curr = 0;
	var skip = 0;
	
	if(typeof lengths == "string") lengths = lengths.map(e => e.charCodeAt(0));
	lengths = lengths.concat([17, 31, 73, 47, 23]);
	
	function DoRound(){
		var lengs = lengths.slice();
		while(lengs.length){
			var l = lengs.shift();
			
			var s = list.concat(list).splice(curr, l);
			s.reverse();
			list = list.map((e, i) => ((s[listSize + i - curr] + 1) || (s[i - curr] + 1) || (e + 1)) - 1);
			
			curr += l + skip;
			curr = curr % listSize;
			skip++;
		}
	}
	
	for(var i = 0; i < 64; i++) DoRound();
	
	var sparse = [];
	while(list.length) sparse.push(list.splice(0, 16));
	return sparse.map(b => b.reduce((acc, e, i, a) => acc ^ e, 0));
}

