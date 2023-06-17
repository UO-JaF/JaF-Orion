// JustanotherFace (JaF)'s Auto Protection (Justice) Script
// Ver: 1.0  Date: 06/10/2023 
// Special Thanks to 'gloom', 'Altiric' and 'Ali' for giving me pointers on how to pull the name from the journal text!! 
//
// This script will use justice to protect player characters that are green or blue 
// **NOTE** The character you want to protect MUST be in your Orion Friend list 
// or "feel party as friends", "feel friendly (green) as friends" or "feel guild tags as friends" checked
// it will send a Guild message when you protect someone, and also when protection is broken.


function JaF_Protect()
{
Orion.ClearIgnoreList('ProtectedList');	
Orion.ClearJournal();
Orion.AddIgnoreList('ProtectedList');
Orion.UseIgnoreList('ProtectedList');
while (!Player.Dead())
    {
	  Orion.UseIgnoreList('ProtectedList');
      var ppl = Orion.GetIgnoreList('ProtectedList').Items()
	  for (var i = 0; i < ppl.length; i++)
	  {
	  var fren = ppl[i]; 
	  var friend = Orion.FindTypeEx('any', '-1', 'ground', 'near|inlos|human|ignoreself', 10, 'blue, green');
      if((friend.length > 0)&& (!Orion.Contains(fren.Serial(), friend))){
        Orion.InvokeVirtue('Justice')
        var target = (friend[0]);
        Orion.Print(target.Name())    
        Orion.WaitTargetObject(target.Serial())
        Orion.ShowStatusbar(target.Serial(),100,100);
        Orion.CloseStatusbar(target.Serial())
		Orion.Wait(5000) // 5 seconds for them to accept before it moves on		
		}
	  }

	
	if (Orion.InJournal("You are now protecting"))
		{
			var proText = "You are now protecting";
			var findproText = Orion.WaitJournal(proText, 0, 0, 'my|sys',0);
			Orion.Wait(200)
			var prowho = (findproText.Text().split(proText + " ")[1]);
			Orion.CharPrint ('self', 44,  (prowho) + " " + "is now under your protection")
			Orion.SayGuild ((prowho) +  " is now under the protection of " + Player.Name())
			Orion.AddIgnoreListObject('ProtectedList', [target.Serial()], [target.Name()]);
			Orion.ClearJournal();
		}
	else if ((Orion.InJournal("You cannot protect that player right now")) && (!Orion.Contains(fren.Serial(), friend))) 
		{
			Orion.CharPrint ('self', 44, target.Name() + " is already being protected by someone")
			Orion.SayGuild (target.Name() + " is already being protected, is it by " + Player.Name() + "??")
			Orion.ClearJournal();
			Orion.AddIgnoreListObject('ProtectedList', [target.Serial()], [target.Name()]);
		}
	else if (Orion.InJournal("has declined your protection"))
		{
			Orion.CharPrint ('self', 44, target.Name() + " has declined your protection")
			Orion.SayGuild (target.Name() + " has declined protection from " + Player.Name())
			Orion.ClearJournal();
		}
	else if (Orion.InJournal("You must wait a while before offering your protection again"))
		{
			Orion.CharPrint ('self', 44, "Because " + target.Name() + " refused protection, you must wait before trying to protect them again")
			Orion.SayGuild ("Because " + target.Name() + " refused protection, " + Player.Name() + " must wait before trying to protect them again")
			Orion.ClearJournal();
			
		}
	else if (Orion.InJournal("The protective relationship between"))
		{
			var cancText = "The protective relationship between";
			var findcancText = Orion.WaitJournal(cancText, 0, 0, 'my|sys',0);
			Orion.Wait(200)
			var cancString = (findcancText.Text());
			var cancwho = cancString.match(/The protective relationship between (?:Lord |Lady )?(.*) and (?:Lord |Lady )?(.*) has been ended/);
			Orion.CharPrint ('self', 44, cancwho[1] + " has lost protection, clearing ignore list")
			Orion.SayGuild ( cancwho[1] + " has lost protection from " + Player.Name() + ". " + cancwho[1] + " Please find " + Player.Name() + " to be reprotected")
			Orion.Wait(200)         
            Orion.ResetIgnoreList('ProtectedList');
            Orion.Wait(200)
            Orion.ClearIgnoreList('ProtectedList');
			Orion.ClearJournal();
			Orion.AddIgnoreList('ProtectedList');
			Orion.UseIgnoreList('ProtectedList');
		}
		Orion.Wait(3500)
    }
} 
