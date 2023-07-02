// JustanotherFace (JaF)'s Honor Champs
// Ver: 1.3 Date: 07/02/2023
//
// This script will find champs when they spawn and attempt to honor them
const HonorBuffIcon = '0x7601';
Orion.ClearJournal()
Orion.IgnoreReset()
function honorChamp() 
{
	Orion.AddIgnoreList('ChampList');
	Orion.UseIgnoreList('ChampList');
    while (!Player.Dead())
    {
    	Orion.UseIgnoreList('ChampList');
        var champ = Orion.FindTypeEx('0x010B|0x030C|0x0028|0x003F|0x00B0|0x0190|0x0191|0x00AF|0x00AC|0x0092|0x00AD|0x00AE', any, ground, 'mobile|inlos|live|ignorefriends|ignoreself', 8, 'gray|red|enemy');

        while (!champ.length)
        {
        	Orion.UseIgnoreList('ChampList');
            Orion.Wait(100);
            champ = Orion.FindTypeEx('0x010B|0x030C|0x0028|0x00B0|0x0190|0x0191|0x00AF|0x00AC|0x0092|0x00AD|0x00AE', any, ground, 'mobile|inlos|live|ignorefriends|ignoreself', 8, 'gray|red|enemy');
        }

        champs = champ[0];

        Orion.GetStatus(champs.Serial());
        Orion.Wait(100);
		var itemProperties = champs.Properties();
		Orion.Wait(500)
        if (champs.Hits("%") == 100)
        {
        	if (Orion.Contains(itemProperties, ("Revenant")))
				{
				Orion.Ignore(champs.Serial())
				}
			else
        	{
        	Orion.ClearJournal()
            Orion.WaitTargetObject(champs.Serial());
            Orion.InvokeVirtue("Honor");
            Orion.Wait(1000);
			Orion.AddHighlightCharacter(champs.Serial(), '55', true)
			Orion.Wait(500)
			}
		}	
            if (Orion.InJournal("You started Honorable Combat"))
            	{
            	Orion.CharPrint(champs.Serial(), 44, "I'm HONORED for you to kill me")
				Orion.PauseScript();	
            	}
        
            else if (Orion.InJournal("Target cannot be seen"))
            	{
            	Orion.CharPrint(champs.Serial(), 55, "Your Target Cannot Be Seen!")
            	}
            else if (Orion.InJournal("Somebody else is honoring this opponent"))
            	{
            	Orion.CharPrint(champs.Serial(), 55, "Somebody beat you to it!")
            	Orion.PauseScript()
            	}
            else if (Orion.InJournal("You are too far away to honor your opponent"))
               	{
               	Orion.ClearJournal()
            	Orion.CharPrint(champs.Serial(), 55, "Get Closer to your target you dummy!")
            	}
			else if (Orion.InJournal("You are already under Honorable Combat with this target"))
            	{
            	Orion.ClearJournal()
            	Orion.CharPrint(champs.Serial(), 44, "I'm STILL HONORED for you to kill me")
            	Orion.PauseScript();
            	}
        else if ((champs.Hits("%") != 100) && (!Orion.BuffExists(HonorBuffIcon)))
        {
        Orion.CharPrint ('self', 44, "Champ not at 100% health. Try again")
        Orion.Wait (100)
        }

	}
}
