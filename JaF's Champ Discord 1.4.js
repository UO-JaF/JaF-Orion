// JustanotherFace (JaF)'s Champ Discord
// Ver: 1.3 Date: 06/06/2023
//
// This script will find instruments in your pack
// and detect which slayer instruments they are.
// It will then find the specific champ as long as you are within 10 tiles of the champ
// It will discord the champ with the correct slayer instrument if the champ has a slayer, 
// if there is no slayer for the champ (Harrower) it will use an exceptional instrument. 
// For fey it uses the Nature's tears Fey Slayer (currently only the lute because that's all I have to get the type from)
// For the exceptional it uses an exceptionally crafted flute.
// For the Reptile / Repond slayer it uses Gwenno's Harp
// For the Undead / Demon slayer it uses the Iolo's Lute
// For the spider slayer it uses either the left or right facing looted Lute

function Autostart() {
	functions = [
		"findslayer",
		"discoNearest",
	]

	functions.forEach(function (script) {
		Orion.Terminate(script);
		Orion.Exec(script);
	})
	Orion.ClearJournal();
	Orion.ClearIgnoreList('DiscoList');
	Orion.IgnoreReset();
	Orion.ResetIgnoreList('DiscoList');
}

function findslayer()
{


	while (!Player.Dead())
	{
		var instruments = Orion.FindType('0x0EB3|0x0EB2|0x0EB4|0x0EB3|0x2807', any, backpack);
		Orion.Wait(1000)
       
		if (instruments.length > 0)
		{
					
        instruments.forEach(function(x)
			{
			 var inst = Orion.FindObject (x)
			if (instruments == null) 
				{
					return;
				}

			Orion.Wait(500)
			if (inst == null)
			{
			return;
			}
			
			var itemProperties = inst.Properties();
			Orion.Wait(500)
			if ((Orion.Contains(itemProperties, "Undead Slayer", [ignoreCase=true] )) && (Orion.Contains(itemProperties, "Demon Slayer", [ignoreCase=true] )))
			{
				Shared.AddVar('undead', [inst.Serial()]);
				Shared.AddVar('demon', [inst.Serial()]);
			}
			else if ((Orion.Contains(itemProperties, "Reptile Slayer", [ignoreCase=true] )) && (Orion.Contains(itemProperties, "Repond Slayer", [ignoreCase=true] )))
			{
				Shared.AddVar('reptile', [inst.Serial()]);
				Shared.AddVar('repond', [inst.Serial()]);
			}			
			else if  (Orion.Contains(itemProperties, "Undead Slayer", [ignoreCase=true] )) 
			{
				Shared.AddVar('undead', [inst.Serial()]);
			}
			else if  (Orion.Contains(itemProperties, "Demon Slayer", [ignoreCase=true] )) 
			{
				Shared.AddVar('demon', [inst.Serial()]);
			}
			else if  (Orion.Contains(itemProperties, "Reptile Slayer", [ignoreCase=true] )) 
			{
				Shared.AddVar('reptile', [inst.Serial()]);
			}
			else if  (Orion.Contains(itemProperties, "Repond Slayer", [ignoreCase=true] )) 
			{
				Shared.AddVar('repond', [inst.Serial()]);
			}
			else if  (Orion.Contains(itemProperties, "Spider Slayer", [ignoreCase=true] )) 
			{
				Shared.AddVar('spider', [inst.Serial()]);
			}	
			else if (Orion.Contains(itemProperties, "Crafted By|Exceptional", [ignoreCase=true] ))
			{
				Shared.AddVar('excep', [inst.Serial()]);
			}
			else if  (Orion.Contains(itemProperties, "Fey Slayer", [ignoreCase=true] )) 
			{
				Shared.AddVar('fey', [inst.Serial()]);
			}
			});
		}
	}
}	
	
function discoNearest()
    {
    while (!Player.Dead())
        {
        Orion.UseIgnoreList('DiscoList');
        var mobs = Orion.FindTypeEx('0x030C|0x002A|0x00B0|0x0190|0x0191|0x00AF|0x00AC|0x0092|0x00AD|0x00AE', any, ground, 'mobile|inlos|live|ignorefriends|ignoreself', 10, 'gray|red|enemy').sort(function(a, b)
            {
            return Orion.GetDistance(a.Serial()) - Orion.GetDistance(b.Serial())
            });
        
        if (mobs.length > 0)
			{
			Orion.Wait(500)
			var target = mobs[0];
			var itemProperties = target.Properties();
			Orion.Wait(1500)
			if (((target.Graphic() == 0x0190) && (Orion.Contains(itemProperties, "The Piper", [ignoreCase=true]))) || ((target.Graphic() == 0x002A) && (Orion.Contains(itemProperties, "The Piper", [ignoreCase=true])))) // Barracoon the Piper
				{
				var inst = Shared.GetVar('repond')
				Orion.Wait(400)
				Orion.UseObject(inst)
				Orion.Print("Found Repond/Rat Champ and Using Repond Slayer Instrument" + " " + (inst));
				}
			else if ((target.Graphic() == 0x0191) && (Orion.Contains(itemProperties, "Neira The Necromancer", [ignoreCase=true]))) // Neira
				{
				var inst = Shared.GetVar('excep')
				Orion.Wait(400)
				Orion.UseObject(inst)
				Orion.Print("Found Neira the Necromancer and Using Undead Exceptional Instrument" + " " + (inst));
				}
			else if (target.Graphic() == 0x00AC) // Rikktor
				{
				var inst = Shared.GetVar('reptile')
				Orion.Wait(400)
				Orion.UseObject(inst)
				Orion.Print("Found Reptile Champ and Using Reptile Slayer Instrument" + " " + (inst));
				}
			else if (target.Graphic() == 0x00AD) // Mephitis
				{
				var inst = Shared.GetVar('spider')
				Orion.Wait(400)
				Orion.UseObject(inst)
				Orion.Print("Found Spider Champ and Using Spider Slayer Instrument" + " " + (inst));
				}
			else if (target.Graphic() == 0x00AE) //Semidar
				{
				var inst = Shared.GetVar('demon')
				Orion.Wait(400)
				Orion.UseObject(inst)
				Orion.Print("Found Demon Champ and Using Demon Slayer Instrument" + " " + (inst));
				}
			else if (target.Graphic() == 0x030C || target.Graphic() == 0x0092) // True Harrower and The Harrower
				{
				var inst = Shared.GetVar('excep')
				Orion.Wait(400)
				Orion.UseObject(inst)
				Orion.Print("Found Harrower and Using Exceptional Instrument" +" " + (inst));
				}	
			else if (target.Graphic() == 0x00B0 || target.Graphic() == 0x00AF) // Sylvani and Oaks
				{
				var inst = Shared.GetVar('fey')
				Orion.Wait(400)
				Orion.UseObject(inst)
				Orion.Print("Found Fey Champ and Using Fey Slayer Instrument" + " " + (inst));
				}	
			Orion.Wait(800)				
			if((target) && (Orion.Contains(itemProperties, "The Piper", [ignoreCase=true])) || (Orion.Contains(itemProperties, "Neira The Necromancer", [ignoreCase=true])) ||
			(Orion.Contains(itemProperties, "Rikktor", [ignoreCase=true])) || (Orion.Contains(itemProperties, "Mephitis", [ignoreCase=true])) ||
			(Orion.Contains(itemProperties, "Semidar", [ignoreCase=true])) || (Orion.Contains(itemProperties, "Sylvani", [ignoreCase=true])) ||
			(Orion.Contains(itemProperties, "Oaks", [ignoreCase=true])) || (Orion.Contains(itemProperties, "Harrower", [ignoreCase=true])))
				{
					Orion.Print("Using Discordance on " + mobs[0].Name() + " " + mobs[0].Graphic() + " " + mobs[0].Serial() + " that is " + mobs[0].Distance() + " " + "tiles away");
					Orion.UseSkill('Discordance')
					Orion.WaitTargetObject([target.Serial()]);
					Orion.Wait(500)
					if (Orion.InJournal("You play jarring music, suppressing your target's strength"))
					{
						Orion.Print("WOW, First try! Aren't you amazing! Ignoring " + mobs[0].Name() + " " + mobs[0].Graphic() + " " + mobs[0].Serial() );
						Orion.AddIgnoreListObject('DiscoList', [target.Serial()]);
						Orion.ClearJournal();
						Orion.Wait(9000)
					}
					else if (Orion.InJournal("That is too far away"))
					{
						Orion.CharPrint(self, 44, "The Champ is Too Far Away, GET CLOSER")
						Orion.ClearJournal();
						Orion.Wait(500)
					}	
					else if (Orion.InJournal("That creature is already in discord"))
					{
						Orion.Print("Ignoring " + mobs[0].Name() + " " + mobs[0].Graphic() + " " + mobs[0].Serial() );
						Orion.AddIgnoreListObject('DiscoList', [target.Serial()]);
						Orion.Wait (1000)
						Orion.ClearJournal();
					}						
					while (Orion.InJournal('You attempt to disrupt your target, but fail'))
					{
						Orion.Print("Since you failed, RE-Using Discordance on " + mobs[0].Name() + " " + mobs[0].Graphic() + " " + mobs[0].Serial() + " that is " + mobs[0].Distance() + " " + "tiles away");
						Orion.Wait (5500)
						Orion.UseSkill('Discordance')
						Orion.WaitTargetObject([target.Serial()]);
						Orion.Wait(500)
						if (Orion.InJournal("You play jarring music, suppressing your target's strength"))
						{
						Orion.Wait(100)	
						Orion.ClearJournal();
						Orion.Print("FINALLY, SUCCESS! Ignoring " + mobs[0].Name() + " " + mobs[0].Graphic() + " " + mobs[0].Serial() );
						Orion.AddIgnoreListObject('DiscoList', [target.Serial()]);
						Orion.Wait(9000)
						Orion.ClearJournal();
						}
					}


				}
			}
        else if (!mobs.length)
            { 
            Orion.Wait(800)
			discoNearest()
            }
		
        }
    }
    	
    
		