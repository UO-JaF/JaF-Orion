// JustanotherFace (JaF)'s PowerScroll Alert Script for Protectors
// Ver: 1.2  Date: 04/01/2023
// This script checks your backpack for Pink scrolls and alerts via Guild Chat 

function Autostart() {
	functions = [
		"JaFPinkSearch",
		"JaFWhiteSearch",
	]

	functions.forEach(function (script) {
		Orion.Terminate(script);
		Orion.Exec(script);
	})
}
//
function JaFPinkSearch()
{
    while ( !Player.Dead() ) 
    {
            Orion.AddIgnoreList('PinkScrollList');
		    Orion.UseIgnoreList('PinkScrollList');
    		var pinks = Orion.FindType('0x14EF', '0x0490', backpack);  // find pinks in backpack
		pinks.forEach(Contents)
    		Orion.Wait(6000)
    }
}
//
function Contents(pinks)
{

	if (pinks.length > 0)
    {

		var itemSelected = Orion.FindObject(pinks);
		var itemProperties = itemSelected.Properties();
		Orion.Wait(800)
		var prop = (itemSelected.Properties().split("Skill: ")[1]);
		Orion.Wait(500)
		Orion.CharPrint('self', 45, (prop))
		Orion.Wait(500)
		Orion.SayGuild(Player.Name() + " received for protection a: " + (prop) + " pink scroll. Claim it now if it was yours and you want it!!")
		Orion.AddIgnoreListObject('PinkScrollList', [itemSelected.Serial()], [prop]);//Orion.Ignore(itemSelected.Serial())        
	}

} 
//
function JaFWhiteSearch()
{
    while ( !Player.Dead() ) 
    {
            Orion.AddIgnoreList('whiteScrollList');
		    Orion.UseIgnoreList('whiteScrollList');
    		var whites = Orion.FindType('0x14EF', '0x0481', backpack);  // find white powerscrolls in backpack
		whites.forEach(Contents1)
    		Orion.Wait(6000)
    }
}
//
function Contents1(whites)
{

	if (whites.length > 0)
    {

		var itemSelected = Orion.FindObject(whites);
		//var itemProperties = itemSelected.Properties();
		Orion.Wait (800)
		var prop = (itemSelected.Properties()); 
		Orion.Wait(800)
		Orion.CharPrint('self', 45, (prop))
		Orion.Wait(500)
		Orion.SayGuild(Player.Name() + 'received for protection: ' + (prop) + "  Winning!!")
		Orion.Wait(500)
		if (Orion.Contains(prop, 105))
		{
		Orion.SayGuild("Who the fuck wasted my Justice with this shitty 105?")
		}
		Orion.AddIgnoreListObject('whiteScrollList', [itemSelected.Serial()]);        
	}

}

