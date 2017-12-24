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

int queue_length = 0;
bridge expand_bridge(bridge *b)
{
	bridge topb = {0, 0, -999};
	int i;
	uint64_t j;
	
	for(i = 0, j = 1; i < num_comps; i++, j = j << cast64(1))
	{
		bridge newb = {0, 0, 0};
		
		if(b->c & j) continue; // this component has been used
		if(!(comps[i] & b->p)) continue; // component doesn't have port
		
		topb.w = -988;
		
		newb = *b;
		newb.w += compw[i];
		newb.c |= j; // use this component
		newb.p = ~(b->p);
		newb.p &= comps[i]; // tries to find the other port of the component
		if(!newb.p) newb.p = b->p; // in case component has two same ports
		
		queue_length++;
		newb = expand_bridge(&newb);
		if(is_better(&newb, &topb)) topb = newb;
	}
	
	//queue_length--;
	return topb;
}

void print_bridge(bridge *b)
{
	printf("w: %04d   p:%"PRIu64" c:%"PRIu64"\n", b->w, b->p, b->c);
	fflush(stdout);
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
		printf("%02d/%02d %04d %"PRIu64"\n", porta, portb, compw[num_comps], comps[num_comps]);
		num_comps++;
	}
	
	is_better = &is_heavier;
	print_bridge(&startb);
	heavyb = expand_bridge(&startb);
	printf("%d %d\n", heavyb.w, queue_length);
	
	return 0;
}
