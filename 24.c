#include <stdio.h>
#include <inttypes.h>

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
	while(fscanf(inf, "%d/%d", &porta, &portb) == 2)
	{
		comps[num_comps++] = (1 << ((uint64_t) porta)) | (1 << ((uint64_t) portb));
		printf("%02d/%02d    %"PRIu64"\n", porta, portb, comps[num_comps - 1]);
	}
	return 0;
}
