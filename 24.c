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

<<<<<<< HEAD
#define LOW_UINT(a) ((a) & cast64(0xFFFFFFFF))
#define HIGH_UINT(a) ((a) >> cast64(32)))
=======
#define bridge_length(a) (__builtin_popcount((unsigned int) ((a).c & cast64(0xFFFFFFFF))) + \
	__builtin_popcount((unsigned int) ((a).c >> cast64(32))))
int is_longer(bridge *a, bridge *b)
{
	if(bridge_length(*a) > bridge_length(*b)) return 1;
	return 0;
}
>>>>>>> parent of 11e4b5f... single expansion

int good_length = 0;

int is_gooder(bridge *a, bridge *b)
{
	if(bridge_length(*a) == good_length)
	{
		if(bridge_length(*b) == good_length)
		{
			if(a->w > b->w) return 1;
			return 0;
		}
		return 1;
	}
	return 0;
}

int (*is_better)(bridge *, bridge *); // function pointer for comparison function

bridge expand_bridge(bridge *b)
{
	bridge topb = *b;
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
	
	is_better = &is_longer;
	longb = expand_bridge(&startb);
	good_length = bridge_length(longb);
	is_better = &is_gooder;
	bestb = expand_bridge(&startb);
	
	printf("l: %d, w: %d\n", good_length, bestb.w);
	
	return 0;
}
