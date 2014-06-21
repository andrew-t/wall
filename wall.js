var itime = 180;
var ilives = 3;
var deadtime = 2000; //ms

var lives = 0;
var time = 0;

var selected = [];
var found = [];
var groups = [];
var groupsfound = 0;
var groupsfoundbyuser = 0;
var grouporder = [];
var started = false;
var timer = -1;
var dead = false;
var wall = [];
var conns= [];
var connx= [];

function checkurl()
{
	if (document.location.href.indexOf('#') != -1)
		init(document.location.href.replace(/^.*#/, ""));
}

function init(name)
{
	for (i=0; i<16; ++i)
	{
		selected[i] = false;
		found[i] = false;
		groups[i] = Math.floor(i/4) + 1;
		d = document.getElementById("tile"+i);
		d.className = d.className.replace(/ found group\d /, " base ");
	}
	for (i=0; i<4; ++i)
	{
		d = document.getElementById("c"+i);
		d.className = d.className.replace(" v", " iv");
		d.innerHTML = '<input class="connection group'+(i+1)+'" name="conn'+i+'" type="text" />' +
			(i==3 ? '<input class="connbut" type="button" value="Submit" onClick="checkans();"/>' : "");
	}
	groupsfound = 0;
	groupsfoundbyuser = 0;
	grouporder = [];
	started = false;
	dead = false;
	lives = ilives;
	time = itime;
	document.getElementById("clock").innerHTML =
		Math.floor(time/60) + ":" + ((time%60)<10?"0":"") + (time % 60) + " / " + lives + ' / Give up';
	
	loadwall(name);
	order = randomis(16);
	g2=[]; w2=[];
	for (i=0; i<16; ++i)
	{
		g2[i]=groups[order[i]];
		w2[i]=wall[order[i]];
	}
	wall=w2; groups=g2;

	document.getElementById("board").className="";
	document.getElementById("clock").className="";
	document.getElementById("custgrid").className="nonboard iv";
	document.getElementById("menu").className="nonboard iv";
	dispstatus('Adjust your browser zoom, then <a href="javascript:go()">click here to begin</a>', false);
}

function remenu()
{
	dispstatus('Select a wall:', false);
	document.getElementById("board").className="iv";
	document.getElementById("clock").className="iv";
	document.getElementById("custgrid").className="nonboard iv";
	document.getElementById("menu").className="nonboard";
	for (i=0; i<16; ++i)
		document.getElementById("tile" + i).innerHTML = "";
}
function customwall()
{
	dispstatus('Please enter your puzzle:', false);
	document.getElementById("board").className="iv";
	document.getElementById("clock").className="iv";
	document.getElementById("custgrid").className="nonboard";
	document.getElementById("menu").className="nonboard iv";
	for (i=0; i<16; ++i)
		document.getElementById("tile" + i).innerHTML = "";
}

function go()
{
	for (i=0; i<16; ++i)
		document.getElementById("tile" + i).innerHTML = wall[i];
	time=time+1;
	tick();
	if (timer != -1)
		clearInterval(timer);
	timer = window.setInterval(tick, 1000);
	hidestatus();
	started = true;
}

function tick()
{
	if (groupsfound == 4) return;
	if (!started) return;
	cd = document.getElementById("clock");
	--time;
	if (time == 0)
		dispstatus('Time up. <a href="javascript:showanswers();">Display answers</a>', false);
	if (time >= 0)
		cd.innerHTML = Math.floor(time/60) + ":" + ((time%60)<10?"0":"") + (time % 60) + " / " + lives +
			(time > 0 ? ' / <a href="javascript:giveup();">Give up</a>' : ' / Give up');
}
function giveup()
{
	if (groupsfound == 4) return;
	if (time < 0) return;
	dispstatus('<a href="javascript:showanswers();">Display answers</a>', false);
	time = 0;
}
function unlock()
{
	for (i=0; i<16; ++i) if (selected[i])
	{
		if (group == -1) group = groups[i];
		else if (groups[i] != group) group = -2;
		tile = document.getElementById("tile" + i);
		tile.className=tile.className.replace("sel", "base");
		selected[i] = false;
	}
	dead = false;
}

function ctile(tile)
{
	if (dead) return;
	if (!started) return;
	if (time < 0) return;
	num=eval(tile.substring(4))
	tile=document.getElementById(tile);
	if (selected[num])
	{
		tile.className=tile.className.replace("sel", "base");
		selected[num]=false;
	}
	else if (!found[num])
	{
		tile.className=tile.className.replace("base", "sel");
		selected[num]=true;
		
		numsel = 0; for (i=0; i<16; ++i) if (selected[i]) ++numsel;
		if (numsel == 4)
		{
			group = -1;
			for (i=0; i<16; ++i) if (selected[i])
			{
				if (group == -1) group = groups[i];
				else if (groups[i] != group) group = -2;
			}
			if (group == -2)
			{
				if (groupsfound == 2)
				{
					--lives;
					if (lives == 0)
					{
						dispstatus('Out of lives. <a href="javascript:showanswers();">Display answers</a>', false);
						document.getElementById("clock").innerHTML = Math.floor(time/60) + ":" + ((time%60)<10?"0":"") + (time % 60) + " / 0";
						time = 0;
					}
					else if (lives == 1)
						dispstatus("No, that's not a group. One life remaining.", true);
					else
						dispstatus("No, that's not a group. " + lives + " lives remaining.", true);
				}
				else
					dispstatus("No, that's not a group.", true);
				dead = true;
				window.setTimeout("unlock()", deadtime);
			}
			else
			{
				for (i=0; i<16; ++i) if (selected[i])
				{
					tile = document.getElementById("tile" + i);
					tile.className=tile.className.replace("sel", "base");
					selected[i] = false;
				}
				grouporder[groupsfound] = group;
				++groupsfound; j=0;
				for (i=0; i<16; ++i) if (groups[i]==group)
				{
					found[i] = true;
					document.getElementById("tile" + i).className = "tile found group" + groupsfound + " r" + (groupsfound-1) + " c" + j;
					++j;
				}
				j=groupsfound * 4;
				for (i=0; i<16; ++i) if (!found[i])
				{
					document.getElementById("tile" + i).className = "tile base r"+Math.floor(j/4)+" c"+(j%4);
					++j;
				}
				if (groupsfound == 3)
				{
					groupsfoundbyuser = 4;
					if (conns.length==0)
						dispstatus('You solved the wall! <a href="javascript:remenu();">Try another wall</a>', false);
					else
						dispstatus('You solved the wall! <a href="javascript:askconns();">Enter connections</a>', false);
					cd = document.getElementById("clock");
					cd.className = "visible";
					++groupsfound; j=0;
					for (i=0; i<16; ++i) if (!found[i])
					{
						found[i] = true;
						document.getElementById("tile" + i).className = "tile found group" + groupsfound  + " r" + (groupsfound-1) + " c" + j;
						++j;
						grouporder[groupsfound - 1] = groups[i];
					}
				}
				else
					dispstatus("Yes, that's a group.", true);
			}
		}
	}
}

function dispstatus(msg, fade)
{
	sd = document.getElementById("status");
	sd.innerHTML = msg;
	sd.className = "visible";
	if (fade)
		window.setTimeout("hidestatus()", 1500);
}
function hidestatus()
{
	sd = document.getElementById("status");
	sd.className = "invisible";
}

function showanswers()
{
	groupsfoundbyuser = groupsfound;
	for (i=0; i<16; ++i)
		if (!found[i])
		{
			group = groups[i];
			grouporder[groupsfound] = group;
			++groupsfound;
			k=0;
			for (j=0; j<16; ++j)
				if (groups[j] == group)
				{
					document.getElementById("tile" + j).className = "tile found group" + groupsfound  + " r" + (groupsfound-1) + " c" + k;
					found[j]=true;
					++k;
				}
		}
	if (conns.length==0)
		dispstatus('<a href="javascript:remenu();">Try another wall</a>', false);
	else
		dispstatus('<a href="javascript:askconns();">Enter connections</a>', false);
}

function askconns()
{
	for (i=0; i<4; ++i)
	{
		d = document.getElementById("c"+i);
		d.className = d.className.replace(" iv", " v");
	}
	hidestatus();
}

function checkans()
{
	connsright = 0;
	for (i=0; i<4; ++i)
	{
		d = document.getElementById("c"+i);
		m = document.getElementById("conns").elements["conn"+i].value.match(connx[grouporder[i]-1]);
		if ((m != null) && (m != ""))
		{
			d.innerHTML = "Correct: " + conns[grouporder[i]-1];
			connsright++;
		}
		else
			d.innerHTML = "Wrong: " + conns[grouporder[i]-1];
	}
	if ((connsright == 4) && (groupsfoundbyuser == 4))
		dispstatus('You got the full 10 points! <a href="javascript:remenu()">Try another wall</a>', false);
	else if (connsright + groupsfoundbyuser == 1)
		dispstatus('You scored 1 point. <a href="javascript:remenu()">Try another wall</a>', false);
	else
		dispstatus('You scored ' + (connsright + groupsfoundbyuser) + ' points. <a href="javascript:remenu()">Try another wall</a>', false);
}

function submitgrid()
{
	wall = [];
	for (g=0; g<4; ++g)
		for (i=0; i<4; ++i)
			wall[g*4+i] = document.getElementById("customgrid").elements[("i"+g)+i].value;
	conns= [];
	connx= [];
	init('custom');
}
