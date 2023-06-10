// JustanotherFace (JaF)'s Player Alert Bot
// Ver: 1.4  Date: 06/09/2023
//
// This script will hide your character (if you have hiding)
// and search for players that you can see within 22 tiles of you.
// It will also open your paperdoll every 25 seconds to keep you from 
// being logged out. 
// Change your location in the var location = line to your current location
// Change the Discord Webhook to your desired Discord Webhook channe in the var bot = line



var location = "DEL PASS" // Change this to what ever location you are at
var bot = "https://discord.com/api/webhooks/1111442521374077008/KCgEr3t7o80OtA3t-GGfNgUa07hP8FNgCAl9COnFYG3syP7SWvJCrd1Mt2-ool22X4gZ";
var usehiding = true
var paramText = "content=";
var notocolor = "blank"

//*********************************************************************************************
function Autostart() {
	functions = [
		"hideme",
		"detect",
		"keepawake",
	]

	functions.forEach(function (script) {
		Orion.Terminate(script);
		Orion.Exec(script);
	})
var msg = Player.Name() + " has started static monitoring"  +" at " + (location) + " on " + Orion.ShardName() + " at " + Orion.Time('hh:mm:ss') + " ©JaF_2023" ;
Orion.HttpPost(bot, paramText + msg);
Orion.SayGuild(msg);	
}

function keepawake()
{
	if (Player.Dead())
	{
		var msg = Player.Name() + " has been killed!!"  +" at " + (location) + " on " + Orion.ShardName() + " at " + Orion.Time('hh:mm:ss') + " ©JaF_2023" ;
		Orion.HttpPost(bot, paramText + msg);
		Orion.SayGuild(msg);
    }
	while (!Player.Dead())
	{
	Orion.OpenPaperdoll('self');
	Orion.Wait(25000)
	}
}
function hideme()
{
	if (Player.Dead())
	{
		var msg = Player.Name() + " has been killed!!"  +" at " + (location) + " on " + Orion.ShardName() + " at " + Orion.Time('hh:mm:ss') + " ©JaF_2023" ;
		Orion.HttpPost(bot, paramText + msg);
		Orion.SayGuild(msg);
    }
	while (!Player.Dead())
	{
		if (!Player.Hidden() && usehiding == true)
		{
		Orion.UseSkill('21')
		Orion.Wait(11000)
		}
		if (Player.Hidden())
		{
		Orion.Wait(100)
		}
	}

}
function detect()
{
	if (Player.Dead())
	{
		var msg = Player.Name() + " has been killed!!"  +" at " + (location) + " on " + Orion.ShardName() + " at " + Orion.Time('hh:mm:ss') + " ©JaF_2023" ;
		Orion.HttpPost(bot, paramText + msg);
		Orion.SayGuild(msg);
    }
    Orion.IgnoreReset();

    while (!Player.Dead())
    {
        var playerserial = Orion.FindType(any, any, ground, "ignoreself|human|live", 22, "blue|gray|green|criminal|enemy|red");
        Orion.Wait(200)
		if (playerserial.length > 0)
		{
					
        playerserial.forEach(function(x)
		{
			if (playerserial.length > 0) 
			{

			var noto = Orion.FindObject (x)
			Orion.Wait(200)
			if (playerserial == null) 
				{
					return;
				}
			Orion.Wait(200)
			if (noto == null)
			{
			return;
			}
			var itemProperties = noto.Properties();
			Orion.Wait(200)
			if  (Orion.Contains(itemProperties, "The Priest Of Mondain|The Wandering Healer|The Mage" , [ignoreCase=true] )) 
			{
				return;
			}
				if (playerserial.length > 0)
					{		
						if (noto.Notoriety() == 1)
						{
						notocolor = "Blue"
						}
						else if (noto.Notoriety() == 2)
						{
						notocolor = "Green"
						}
						else if (noto.Notoriety() == 3)
						{
						notocolor = "Gray"
						}
						else if (noto.Notoriety() == 4)
						{
						notocolor = "Criminal"
						}
						else if (noto.Notoriety() == 5)
						{
						notocolor = "Enemy-Orange"
						}
						else if (noto.Notoriety() == 6)
						{
						notocolor = "Red"
						}		

						var msg = Player.Name() + " found " + Orion.RequestName(x) +" a  " + ( notocolor)  +" at " + (location) + " on " + Orion.ShardName() + " at " + Orion.Time('hh:mm:ss') + noto.Properties() + " ©JaF_2023" ;
						Orion.Wait(200)
						Orion.HttpPost(bot, paramText + msg);
						Orion.Wait(200)
						Orion.SayGuild(msg);
						Orion.Wait(200)
						if (Orion.ObjectExists(x))
							{
								Orion.Ignore(x);
							}
						if (!Orion.ObjectExists(x))
							{
								Orion.IgnoreReset();
								return;
							}
					else if (!playerserial.length)
						{
						Orion.IgnoreReset();
						return;
						}
						
					Orion.Wait(200);
					}
					
			}
		});
	if (Player.Dead())
		{
			var msg = Player.Name() + " has been killed!!"  +" at " + (location) + " on " + Orion.ShardName() + " at " + Orion.Time('hh:mm:ss') + " ©JaF_2023" ;
			Orion.HttpPost(bot, paramText + msg);
			Orion.SayGuild(msg);
		}
		}
	}
}