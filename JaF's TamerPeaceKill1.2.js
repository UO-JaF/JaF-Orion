// JustanotherFace (JaF)'s Tamer Peace All Kill Script
// Ver: 1.2  Date: 06/15/202
// It should go without saying, you need to be a tamer, and you need to have peacemaking.
// If you experience problems, it could be caused by lag. Adjust the "var lag =" up.
// ** NOTE ** Before you try to peace something you have to use an instrument 
function Autostart() {
	functions = [
		"JaF_Instrument",
		"JaF_PeaceKill",
	]

	functions.forEach(function (script) {
		Orion.Terminate(script);
		Orion.Exec(script);
	})
	Orion.ClearJournal();
}
//
function JaF_Instrument() {
		while (!Player.Dead()) {
		var instruments = Orion.FindType('0x0EB3|0x0EB2|0x0EB4|0x0EB3|0x2807', any, backpack);
		Orion.Wait(1000)
       
		if (instruments.length > 0)
		{
					
        instruments.forEach(function(x)
			{
			 var inst = Orion.FindObject (x)
			if (instruments == null) 
				{
					Orion.CharPrint('self', 44, "You do not have any instruments!")
					return;
				}
		var itemProperties = inst.Properties();
		Orion.Wait(500)
		if (Orion.Contains(itemProperties, "Crafted By|Exceptional", [ignoreCase=true] ))
			{
			Shared.AddVar('excep', [inst.Serial()]);
			}
			});
	
		}
	}
}
function JaF_PeaceKill() {
	var lag = 500
	var inst2 = Shared.GetVar('excep')
	Orion.Wait(lag)
	Orion.UseObject(inst2)
	Orion.Print("Found and Using Exceptional Instrument" +" " + (inst2));	
    while (!Player.Dead()) {
//	
		Orion.Wait(400)
        Orion.ClearJournal();
        target = Orion.FindType('-1', '-1', ground, 'mobile|live|ignorefriends|ignoreself|inlos', 10, 'gray|criminal')
        if (target.length) {
            for (var i = 0; i < target.length; i++) {
                Orion.AddHighlightCharacter(target[i], '130');
                tgtobj = Orion.FindObject(target[i]);
				Orion.ShowStatusbar(target[i],100,100);
//
                if (Orion.ObjectExists(tgtobj.Serial())){
					Orion.Wait(lag);
					Orion.SetTimer('redo', 0);
					Orion.SayWhisper("All Follow");
					Orion.WaitTargetObject(target[i]);
					Orion.Wait(lag)
					Orion.SayWhisper("All Kill");
					Orion.WaitTargetObject(target[i]);
					Orion.Wait(lag)
					Orion.Print("First Follow Kill")
					if (tgtobj.WarMode()){
						Orion.UseSkill('Peacemaking');
						Orion.WaitTargetObject(target[i]);
						Orion.Print("First Peacemaking")
						Orion.Wait(lag);
//
						if (!Orion.ObjectExists(tgtobj.Serial())) {
							Orion.CharPrint('self', 44, "1st Not Exist");
							Orion.ClearHighlightCharacters();
							Orion.Ignore(target[i]);
							Orion.SayWhisper("All Guard Me");
							Orion.Wait(lag)
							Orion.SayWhisper("All Follow Me");
							Orion.CloseStatusbar(target[i])
							Orion.Wait(lag)
							break;
						}
					}
				else if (!Orion.ObjectExists(tgtobj.Serial())) {
					Orion.CharPrint('self', 77, "Else IF Not Exist");
					Orion.ClearHighlightCharacters();
					Orion.Ignore(target[i]);
					Orion.SayWhisper("All Guard Me");
					Orion.Wait(lag)
					Orion.SayWhisper("All Follow Me");
					Orion.CloseStatusbar(target[i])
					Orion.Wait(lag)
					break;
				}
//
                    if (tgtobj.WarMode()){
						Orion.UseSkill('Peacemaking');
						Orion.WaitTargetObject(target[i]);
						Orion.Wait(lag)
						Orion.Print("Second Peacemaking")
						if (!Orion.ObjectExists(tgtobj.Serial())) {
							Orion.CharPrint('self', 55, "2nd Peacemaking not exist");
							Orion.ClearHighlightCharacters();
							Orion.Ignore(target[i]);
							Orion.SayWhisper("All Guard Me");
							Orion.Wait(lag)
							Orion.SayWhisper("All Follow Me");
							Orion.CloseStatusbar(target[i])
							Orion.Wait(lag)
							break;
						}
					}
				}
					while (Orion.ObjectExists(tgtobj.Serial()) && (Orion.Timer('redo') < 15000)){
						Orion.Wait(1000)
					}
                    while (Orion.ObjectExists(tgtobj.Serial()) && (Orion.Timer('redo') > 15000)){
						var redo = (Orion.Timer('redo'));
						Orion.Print("Timer = " + redo);
						Orion.Wait(1000)
						Orion.CharPrint('self', 46, "Same Enemy Still Exists and redo Timer Expired");
						if (tgtobj.WarMode()){
							Orion.UseSkill('Peacemaking');
							Orion.WaitTargetObject(target[i]);
							Orion.Wait(lag)
							Orion.Print("Third Peacemaking")
							if (!Orion.ObjectExists(tgtobj.Serial())) {
								Orion.CharPrint('self', 66, "3rd Peace after redo timer Not Exist");
								Orion.ClearHighlightCharacters();
								Orion.Ignore(target[i]);
								Orion.SayWhisper("All Guard Me");
								Orion.Wait(lag)
								Orion.SayWhisper("All Follow Me");
								Orion.CloseStatusbar(target[i])
								Orion.Wait(lag)
								break;
							}
						}
//
						Orion.SetTimer('redo', 0);
						Orion.Wait(lag)
                    }
					if (!Orion.ObjectExists(tgtobj.Serial())) {
						Orion.CharPrint('self', 77, "Final Not Exist");
						Orion.ClearHighlightCharacters();
						Orion.Ignore(target[i]);
						Orion.SayWhisper("All Guard Me");
						Orion.Wait(lag)
						Orion.SayWhisper("All Follow Me");
						Orion.CloseStatusbar(target[i])
						Orion.Wait(lag)
						break;
					}
				}
            
        }
    }
}