#include <stdio.h>
#include <inttypes.h>

#define cast64(a) ((uint64_t) a)

uint64_t comps[64]; // bitfield of ports each component has
unsigned int compw[64]; // weight of each comp
size_t num_comps = 0; 

typedef struct bridge
{
	uint64_t c; // bitfield of used comps
	uint64_t p; // port at bridge's tail, in bitfield format
	unsigned int w; // weight
} bridge;

int is_heavier(bridge *a, bridge *b)
{
	if(a->w > b->w) return 1;
	return 0;
}

int (*is_better)(bridge *, bridge *); // function pointer for comparison function

bridge expand_bridge(bridge *b)
{
	bridge topb = {0, 0, 0};
	int i;
	uint64_t j;
	
	for(i = 0, j = 1; i < num_comps; i++, j = j << cast64(1))
	{
		bridge newb;
		
		if(b->c & j) continue; // this component has been used
		if(!(comps[i] & b->p)) continue; // component doesn't have port
		
		newb = *b;
		newb.w += compw[i];
		newb.c |= j; // use this component
		newb.p = (~j) & comps[i]; // tries to find the other port of the component
		if(!newb.p) newb.p = j; // in case component has two same ports
		
		newb = expand_bridge(&newb);
		if(is_better(&newb, &topb)) topb = newb;
	}
	
	return topb;
}

int main()
{
	FILE *inf = fopen("./input24.txt", "r");
	int porta, portb;
	bridge startb = {0, 1, 0}, heavyb, longb, bestb;
	
	if(!inf)
	{
		printf("ERROR!!!!");
		return 1;
	}
	while(fscanf(inf, "%d/%d", &porta, &portb) == 2)
	{
		comps[num_comps] = (cast64(1) << cast64(porta)) | (cast64(1) << cast64(portb));
		compw[num_comps] = porta + portb;
		//printf("%02d/%02d %04d %"PRIu64"\n", porta, portb, compw[num_comps], comps[num_comps]);
		num_comps++;
	}
	
	is_better = &is_heavier;
	
	heavyb = expand_bridge(&startb);
	printf("%d\n", heavyb.w);
	
	return 0;
}
