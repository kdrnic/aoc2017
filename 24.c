#include <stdio.h>
#include <stdint.h>

int main()
{
	uint64_t comps[64];
	size_t num_comps = 0;
	FILE *inf = fopen("./input24.txt", "r");
	int porta, portb;
	
	if(!inf)
	{
		printf("ERROR!!!!");
		return 1;
	}
	while(fscanf(inf, "%d,%d", &porta, &portb) == 2)
	{
		comps[num_comps++] = porta | portb;
	}
	return 0;
}
