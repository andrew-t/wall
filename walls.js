function loadwall(name)
{
	switch (name)
	{
		case "custom": return;

		case "easy":
			wall = ["Red", "Blue", "Green", "Yellow",
					"Six", "Ten", "Four", "Nine",
					"France", "England", "Germany", "Austria",
					"Pizza", "Burgers", "Sausages", "Chips"];
			conns= ["Colours", "Numbers", "Countries", "Foods"];
			connx= [/colou?r/i, /number/i, /(countr)|(nation)|(europe)/i, /(food)|(meal)/i];
			break;
			
		case "russel":
			wall = ["Connections", "Joints", "Interfaces", "Junctions",
					"Fibonacci", "Opening", "Title", "Launch",
					"Missing Vowels", "Emoticons", "Abbreviations", "Autocorrect",
					"Synonyms", "Sequences", "Aspects of text speak", "Groups on this wall"];
			conns= ["Synonyms", "Sequences", "Aspects of text speak", "Groups on this wall"];
			connx= [/synonym/i, /sequence/i, /te?xt/i, /this/i];
			break;
			
		case "numbers":
			wall = ["2", "5", "7", "11",
					"4", "16", "9", "1",
					"32", "8", "128", "0.5",
					"6", "10", "15", "21"];
			conns= ["Primes", "Squares", "Powers of two", "Triangular numbers"];
			connx= [/prime/i, /square/i, /power.*(2|two)/i, /triang/i];
			break;
			
		case "stecks1":
			wall = ["Murphy", "Hooke", "Cole", "Newton",
					"Quark", "O'Brien", "Bashir", "Jake",
					"Proton", "Back", "Expansion", "Blister",
					"Electron", "Step", "Extension", "Rope"];
			conns= ["Laws", "Deep Space 9", "____ Pack", "Types of ladder"];
			connx= [/law/i, /((deep space )|(ds))(9|(nine))/i, /pack/i, /ladder/i];
			break;
			
		case "stecks2":
			wall = ["Jupitus", "Bailey", "Fielding", "Hughes",
					"Bowling", "Tennis", "Golf", "Baseball",
					"Bill", "Tim", "Donkey", "Black Beauty",
					"Duck", "Bulldog", "Stinger", "Hammerhead"];
			conns= ["NMTB Captains", "Wii Sports", "Fictional beasts of burden", "BSG Callsigns"];
			connx= [/(nmtb)|(buzzcock)/i, /wii/i, /(burden)|(horse)/i, /(bsg)|(battlestar)|(galactica)|(callsigns)/i];
			break;
			
		case "doctor":
			wall = ["Tim", "Bilbo", "Arthur Dent", "John Watson",
					"Sheldon Cooper", "Ross Geller", "Mohinder Suresh", "House",
					"Holly", "Kryten", "Data", "The Doctor",
					"Dave Lister", "Cat", "Superman", "Robert Neville"];
			conns= ["Martin Freeman characters", "Doctors", "Artificial Intelligences", "Endlings"];
			connx= [/freeman/i, /d(octo)?r/i, /ai|artific|simulat/i, /endling|\blast\b/i];
			break;
			
		case "dragon":
			wall = ["Carrot", "Colon", "Shoe", "Visit",
					"Chain", "Foot", "League", "Pole",
					"Pound", "Slash", "Dagger", "Dash",
					"Point", "Line", "Disc", "Ball"];
			conns= ["Ankh-Morpork City Watchmen", "Imperial length units", "Violent punctuation", "Interior of the n-sphere"];
			connx= [/ankh|morpork|watch|discworld/i, /unit|length|imperial/i, /mark|punctutat/i, /\bn\b|ball|sphere|dimension/i];
			break;
	}
}
