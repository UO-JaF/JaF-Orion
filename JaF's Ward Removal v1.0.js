// JustanotherFace (JaF)'s Ward Removal Talisman Script
// Ver: 1.0  Date: 06/26/2023

Orion.IgnoreReset();
Shared.AddVar ('curtali', (Orion.ObjAtLayer(9)));
function wardremoval(){
var talismans = Orion.FindType('0x2F58|0x2F5B|0x2F59|0x2F5A|0x1096', -1, backpack);
if(talismans.length > 0)
	{
		for(t=0;t<talismans.length;t++)
		{
			Orion.Wait(250)
			var ward = Orion.FindObject(talismans[t]);
			if(Orion.Contains(ward.Name(), 'Ward Removal') == true){
			Orion.Unequip(9);
			Orion.Wait(1000);
			Orion.Equip(ward.Serial());
			Orion.Wait(800);
			var taliprops = ward.Properties();
			Orion.Wait(800);
			Orion.Print(taliprops);
			Orion.Wait(200);
			if (Orion.Contains(taliprops, ('Charge Time Left'))){
				Orion.Ignore(ward.Serial());
				Orion.Print(140, ward.Serial() + " " + "Talisman is not fully charged. Ignoring this one");
				Orion.Wait(500);
				wardremoval()
				}
			else if (Orion.Contains(taliprops, ('Fully Charged'))){
				usetali()
				Orion.Wait(800);
				break;
				}
			}
		}
	}
else if(!talismans.length)
	{
		Orion.Print(55, "You have no more Talismans to check. Ending");
	}
	
}
function usetali() {
	Orion.Wait(1000);
	var tali = (Orion.ObjAtLayer(9));
	Orion.Wait(900);
	Orion.UseObject(tali.Serial());
	Orion.Wait(500);
	Orion.Print(130, "Found and used Ward Remover Talisman");
	Orion.Wait (1300);
	Orion.Print(130, tali.Serial());
	Orion.Wait(300);
	var redo = Shared.GetVar('curtali');
	Orion.Wait(300);
	Orion.Equip(redo.Serial());
	Orion.PauseScript('wardremoval');
}

