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

// part 1 comparison
int is_heavier(bridge *a, bridge *b)
{
	if(a->w > b->w) return 1;
	return 0;
}

#define LOW_UINT(a) ((a) & cast64(0xFFFFFFFF))
#define HIGH_UINT(a) ((a) >> cast64(32)))

#define bridge_length(a) (__builtin_popcount((unsigned int) LOW_UINT((a).c)) + \
	__builtin_popcount((unsigned int) HIGH_UINT((a).c)))

// part 2 comparison
int is_better(bridge *a, bridge *b)
{
	unsigned int la = bridge_length(*a);
	unsigned int lb = bridge_length(*b);
	if(la > lb) return 1;
	if(la == lb)
	{
		if(a->w > b->w) return 1;
		return 0;
	}
	return 0;
}

void expand_bridge(bridge *b, bridge *topb1, bridge *topb2)
{
	int i;
	uint64_t j;
	
	for(i = 0, j = 1; i < num_comps; i++, j = j << cast64(1))
	{
		bridge newb = *b;
		
		if(b->c & j) continue; // this component has been used
		if(!(comps[i] & b->p)) continue; // component doesn't have port
		
		newb.w += compw[i];
		newb.c |= j; // use this component
		newb.p = ~(b->p);
		newb.p &= comps[i]; // tries to find the other port of the component
		if(!newb.p) newb.p = b->p; // in case component has two same ports
		
		if(is_heavier(&newb, topb1)) *topb1 = newb;
		if(is_better(&newb, topb2)) *topb2 = newb;
		
		expand_bridge(&newb, topb1, topb2);
	}
}

int main()
{
	FILE *inf = fopen("./input24.txt", "r");
	int porta, portb;
	bridge startb = {0, 1, 0}, bestb1 = {0, 1, 0}, bestb2 = {0, 1, 0};
	
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
	
	expand_bridge(&startb, &bestb1, &bestb2);
	
	printf("%d, %d\n", bestb1.w, bestb2.w);
	
	return 0;
}
