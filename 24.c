#include <stdio.h>
#include <stdint.h>

int main()
{
	uint64_t comps[64];
	size_t num_comps = 0;
	FILE *inf = fopen("./input24.txt", "r");
	if(!inf)
	{
		printf("ERROR!!!!");
		return 1;
	}
	while(!feof(inf))
	{
		int porta, portb;
		fscanf(inf, "%d,%d", &porta, &portb);
		comps[num_comps++] = porta | portb;
	}
	return 0;
}
