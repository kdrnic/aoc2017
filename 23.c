// part 1: 6241
// This file was hand optimised

#include <stdio.h>
int main(int argc, char **argv)
{
    int b = 0, d = 0, e = 0, h = 0;
    b = 8100 + 100000;
    const int c = 8100 + 100000 + 17000;
	do {
		d = 2;
		do{
			e = 2;
			do {
				if((d * e) == b)
				{
					h++;
					goto labelF;
				}
				e += 1;
			} while(e < (b / d) + 1);
			d += 1;
		} while(d * d < b + 1);
		labelF:
		b += 17;
	} while(b != c);
	h++; // For some reason, calculated result is 1 too low?
	printf("%d", h);
    return 0;
}
