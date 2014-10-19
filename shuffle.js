// fisher-yates shuffle: efficient and highly random. google it; it's interesting.

// returns an array of the numbers 0..(N-1) in a random order
function randomis(n)
{
	is = []; for (i=0; i<n; ++i) is[i]=i;
	for (i=0; i<n; ++i)
	{
		j = Math.floor(Math.random() * (n - i)) + i;
		k = is[j];
		is[j] = is[i];
		is[i] = k;
	}
	return is;
}

// returns the passed array sorted into a random order
function shuffle(a)
{
	for (i=0; i<a.length; ++i)
	{
		j = Math.floor(Math.random() * (a.length - i)) + i;
		k = a[j];
		a[j] = a[i];
		a[i] = k;
	}
	return a;
}