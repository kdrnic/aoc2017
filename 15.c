#include <stdio.h>

#define MAX_GEN 9999999

// STACK LOL
unsigned long long int generatedA[MAX_GEN], generatedB[MAX_GEN];

int main()
{
	unsigned long long int stateA = 873, stateB = 583, modulus = 2147483647, factorA = 16807, factorB = 48271;
	unsigned long long int i, count;
	
	unsigned long int numA, numB;
	
	for(i = 0, count = 0; i < 40000000; i++)
	{
		stateA *= factorA;
		stateB *= factorB;
		stateA = stateA % modulus;
		stateB = stateB % modulus;
		if((stateA & 0xFFFF) == (stateB & 0xFFFF)) count++;
	}
	
	printf("%d", count);
	
	stateA = 873; stateB = 583;
	//stateA = 65; stateB = 8921;
	numA = 0;
	numB = 0;
	
	for(i = 0; !((numA > 5000000) && (numB > 5000000)); i++)
	{
		stateA *= factorA;
		stateB *= factorB;
		stateA = stateA % modulus;
		stateB = stateB % modulus;
		if(stateA % 4 == 0) generatedA[numA++] = stateA;
		if(stateB % 8 == 0) generatedB[numB++] = stateB;
	}
	
	for(i = 0, count = 0; (i < numA) && (i < numB); i++)
	{
		if((generatedA[i] & 0xFFFF) == (generatedB[i] & 0xFFFF)) count++;
	}
	
	printf("\n%d - for some reason the real count may be 1 larger?", count);
	
	return 0;
}
