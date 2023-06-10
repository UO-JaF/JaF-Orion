// JustanotherFace (JaF)'s Counterfeit Commodities Insure Script
// Ver: 1.0  Date: 04/01/2023
// This script checks your backpack for Curiously Adorned Eggs and Bog Hide Mukluks, if it finds either, it insures the item if it is not already insured. 
var ignore = []

function Insure()
{
    while ( !Player.Dead() ) 
    {
    		var backpackContents = Orion.FindType(any, any, backpack);  // find all contents of your backpack
		backpackContents.forEach(Contents)
    		Orion.Wait(6000)
    }
}

function Contents(backpackContents)
{
	var itemSelected = Orion.FindObject(backpackContents);
	var itemProperties = itemSelected.Properties();
	Orion.Wait(500)
	if ((Orion.Contains(itemProperties, ('Hide Mukluks'))) | (Orion.Contains(itemProperties, ('Curiously Adorned Egg'))) && (!Orion.Contains(itemProperties, 'Insured')) && (!Orion.Contains(itemProperties, 'Blessed')) ) 
    {
		Orion.RequestContextMenu('self')
		Orion.WaitContextMenuID('self', 418)
		if (Orion.WaitForTarget(1200))
			Orion.TargetObject(itemSelected.Serial())
			Orion.Wait (200)
			Orion.Ignore(itemSelected.Serial())        
		Orion.CancelTarget()
	}
	Orion.CancelTarget()
	if((Orion.Contains(itemProperties, 'Insured')) | (Orion.Contains(itemProperties, 'Blessed')))
	{
	Orion.Ignore(itemSelected.Serial())
	Orion.Wait (200)
	}
}