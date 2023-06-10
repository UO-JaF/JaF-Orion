// JustanotherFace (JaF)'s Honor Champs
// Ver: 1.0 Date: 06/01/2023
//
// This script will find champs when they spawn and attempt to honor them

Orion.ClearJournal()
Orion.IgnoreReset()
function honorChamp() 
{
    while (!Player.Dead())
    {
        var champs = Orion.FindTypeEx('0x030C|0x00B0|0x0190|0x0191|0x00AF|0x00AC|0x0092|0x00AD|0x00AE', any, ground, 'mobile|inlos|live|ignorefriends|ignoreself', 8, 'gray|red|enemy');

        while (!champs.length)
        {
            Orion.Wait(100);
            champs = Orion.FindTypeEx('0x030C|0x00B0|0x0190|0x0191|0x00AF|0x00AC|0x0092|0x00AD|0x00AE', any, ground, 'mobile|inlos|live|ignorefriends|ignoreself', 8, 'gray|red|enemy');
        }

        champs = champs[0];

        Orion.GetStatus(champs.Serial());
        Orion.Wait(100);

        if (champs.Hits("%") == 100)
        {
            Orion.WaitTargetObject(champs.Serial());
            Orion.InvokeVirtue("Honor");
            Orion.Wait(1000);
            if (Orion.InJournal("You started Honorable Combat"))
            	{
            	Orion.AddHighlightCharacter(champs.Serial(), '55', true)
            	Orion.ClearJournal()
            	Orion.CharPrint(champs.Serial(), 44, "I'm HONORED for you to kill me")
            	Orion.PauseScript('honorChamp');
            	}
            else if (Orion.InJournal("Target cannot be seen"))
            	{
            	Orion.CharPrint(champs.Serial(), 55, "Your Target Cannot Be Seen!")
            	
            	}
            else if (Orion.InJournal("Somebody else is honoring this opponent"))
            	{
            	Orion.CharPrint(champs.Serial(), 55, "Somebody beat you to it!")
            	Orion.PauseScript('honorChamp')
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
            	Orion.PauseScript("honorChamp");
            	}
        }
        else if (champs.Hits("%") != 100)
        {
        Orion.CharPrint ('self', 44, "Champ not at 100% health. Try again")
        Orion.Wait (100)
        }
    }
}