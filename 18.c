#include <stdio.h>
#include <math.h>

#define MAXSND 9999

#define RATE 44100

#define DURTOSEC(a) ((a) / 1000)

int beepto(FILE *file, int f, int d)
{
	int t = 0;
	for(t = 0; t < DURTOSEC(d * RATE); t++)
	{
		double t_d = ((double) t) / ((double) RATE);
		
		double v = sin(M_PI * 2.0 * t_d * ((double) f));
		
		v += 1.00;
		v *= 0.4999;
		
		unsigned int u = (v * 256.0);
		fputc(u, file);
	}
}

int main(int argc, char **argv)
{
	int freqs[MAXSND], durs[MAXSND];
	int scount = 0;
	int i;
	
	FILE *json = fopen("18.json", "r");
	if(!json)
	{
		printf("file not open error\n");
		return 1;
	}
	
	if(fgetc(json) != '[')
	{
		printf("?\n");
		return 1;
	}
	
	while(1)
	{
		char ch = ',';
		int freq, dur;
		fscanf(json, "[%d,%d]%c", &freq, &dur, &ch);
		
		freqs[scount] = freq;
		durs[scount] = dur;
		scount++;
		
		if(ch == ']') break;
	}
	
	for(i = 0; i < scount; i++)
	{
		beepto(stdout, freqs[i], durs[i]);
	}
	
	return 0;
}
