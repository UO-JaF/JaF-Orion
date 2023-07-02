// JustanotherFace (JaF)'s PowerScroll Sort Script
// Ver: 1.0  Date: 07/02/2023 
// This script will search your backpack, including containers inside your backpack for powerscrolls and pinks.
// The first run of this script you should change the const savebooks to 'const savebooks = true' This allows you to
//		set your scrollbooks that you want to drop scrolls into. The script expects you to set a book for 105, another for 110, 
//		another for 115, another for 120 and another for Pinks. It is possible to set all powerscrolls (105-120) to all go into 
//		the same book, by just selecting the desired book with each prompt. 
// This script saves the book serials in the registry on first run if you change the savebooks to true. Once you have run the script and 
//		set your books once you should change the savebooks back to false to avoid getting prompted to setup your books each time you run the 
//		script. If you want to change your books at some point, just change the savebooks back to false and run the script again to 
//  	reset your book serial #'s in the registry, then change savebooks back to false after setting them. 
//		
// If your lag is bad, you can change the drag and drop wait times with the 'const drag' and 'const drop'. These are milliseconds so 1000 = 1 second
//
const savebooks = true
//
const drag = 400
const drop = 800
Orion.IgnoreReset();
//
//***************************************************************************************************************************************************************
function Autostart() {
if (savebooks == true){
	functions = [
		"setbooks",
		]
}
else {
		functions = [
		"findscrolls",
    ]
}    
	functions.forEach(function (script) {
		Orion.Terminate(script);
		Orion.Exec(script);
	})
}
//
function setbooks()
{
		if (savebooks == true){
		var wondrousBook = (Orion.ShardName() +" "+ Player.Name() +" " + 'WondrousBook 105')
		var exaltedBook = (Orion.ShardName() +" "+ Player.Name() +" " + 'ExaltedBook 110')
		var mythicalBook = (Orion.ShardName() +" "+ Player.Name() +" " + 'MythicalBook 115')
		var legendaryBook = (Orion.ShardName() +" "+ Player.Name() +" " + 'LegendaryBook 120')
		var pinkBook = (Orion.ShardName() +" "+ Player.Name() +" " + 'PinkBook')
		Orion.Print(55, "Target your shitty Wondrous PowerScroll(105) book.");
		Orion.WaitForAddObject("WondrousBook");
		var WondrousBooks = Orion.GetSerial('WondrousBook');
		Orion.RegWrite(wondrousBook, (WondrousBooks), 'Software\\OrionAssistant\\vars\\JAF\\ScrollBooks');
		Orion.Wait(3000)
		Orion.Print(55, "Target your Exalted PowerScroll(110) book.");
		Orion.WaitForAddObject("ExaltedBook");
		var ExaltedBooks = Orion.GetSerial('ExaltedBook');
		Orion.RegWrite(exaltedBook, (ExaltedBooks), 'Software\\OrionAssistant\\vars\\JAF\\ScrollBooks');
		Orion.Wait(3000)
		Orion.Print(55, "Target your Mythical PowerScroll(115) book.");
		Orion.WaitForAddObject("MythicalBook");
		var MythicalBooks = Orion.GetSerial('MythicalBook');
		Orion.RegWrite(mythicalBook, (MythicalBooks), 'Software\\OrionAssistant\\vars\\JAF\\ScrollBooks');
		Orion.Wait(3000)	
		Orion.Print(55, "Target your Legendary PowerScroll(120) book.");
		Orion.WaitForAddObject("LegendaryBook");
		var LegendaryBooks = Orion.GetSerial('LegendaryBook');
		Orion.RegWrite(legendaryBook, (LegendaryBooks), 'Software\\OrionAssistant\\vars\\JAF\\ScrollBooks');
		Orion.Wait(3000)
		Orion.Print(55, "Target your Pink Transcendence Scroll book.");
		Orion.WaitForAddObject("PinkBook");
		var PinkBooks = Orion.GetSerial('PinkBook');
		Orion.RegWrite(pinkBook, (PinkBooks), 'Software\\OrionAssistant\\vars\\JAF\\ScrollBooks');
		Orion.Wait(3000)		
		savebooks == false	
		findscrolls()	
		}	
}
//
function findscrolls()
{
while (!Player.Dead()){
	var findscroll = Orion.FindType('0x14EF', '0x0481|0x0490', 'backpack', 'fast|item|recurse');
	if (findscroll.length > 0)
	{
			for(s=0;s<findscroll.length;s++)
			var scroll = Orion.FindObject(findscroll[s]);
			if(Orion.Contains(scroll.Name(), 'Wondrous Scroll') == true){
			Shared.AddVar('scroll1', scroll.Serial())
			moveWondrous105()
			}			
			else if(Orion.Contains(scroll.Name(), 'Exalted Scroll') == true){
			Shared.AddVar('scroll1', scroll.Serial())
			moveExalted110()
			}
			else if(Orion.Contains(scroll.Name(), 'Mythical Scroll') == true){ 
			Shared.AddVar('scroll1', scroll.Serial())
			moveMythical115()
			}
			else if(Orion.Contains(scroll.Name(), 'Legendary Scroll') == true){ 
			Shared.AddVar('scroll1', scroll.Serial())
			moveLegendary120()
			}
			else if(Orion.Contains(scroll.Name(), 'Scroll of Transcendence') == true){ 
			Shared.AddVar('scroll1', scroll.Serial())
			movePinks()
			}
			else{
			Orion.Print(32, "You have a scroll in your pack that will not go into any type of scrollbook. Probably a Stat Scroll. Ignoring that scroll" + (scroll.Serial()))
			Orion.Ignore(scroll.Serial())
			Orion.Wait(drag)
			}			
	}
	if (!findscroll.length){
	break;
	}
 }
}
//
function moveWondrous105()
{
		var wondrousBook = (Orion.ShardName() +" "+ Player.Name() +" " + 'WondrousBook 105')
		var scroll = Shared.GetVar('scroll1')
		Orion.DragItem(scroll);
		Orion.Wait(drag);
		var regwondrous = (Orion.RegRead(wondrousBook, 'Software\\OrionAssistant\\vars\\JAF\\ScrollBooks'));
		Orion.Print(8, 'Adding shitty 105 scroll '+ (scroll) + ' to shitty ' +(regwondrous) + ' 105 scrollbook');
		Orion.DropDraggedItem(regwondrous);
	    Orion.Wait(drop);
}
//
function moveExalted110()
{
		var exaltedBook = (Orion.ShardName() +" "+ Player.Name() +" " + 'ExaltedBook 110')
		var scroll = Shared.GetVar('scroll1')
		Orion.DragItem(scroll);
		Orion.Wait(drag);
		var regexalted = (Orion.RegRead(exaltedBook, 'Software\\OrionAssistant\\vars\\JAF\\ScrollBooks'));
		Orion.Print(55, 'Adding 110 scroll '+ (scroll) + ' to '+(regexalted) + ' 110 scrollbook');
		Orion.DropDraggedItem(regexalted);
	    Orion.Wait(drop);
}
//
function moveMythical115()
{
		var mythicalBook = (Orion.ShardName() +" "+ Player.Name() +" " + 'MythicalBook 115')
		var scroll = Shared.GetVar('scroll1')
		Orion.DragItem(scroll);
		Orion.Wait(drag);
		var regmythical = (Orion.RegRead(mythicalBook, 'Software\\OrionAssistant\\vars\\JAF\\ScrollBooks'));
		Orion.Print(77, 'Adding 115 scroll '+ (scroll) + ' to ' +(regmythical) + ' 115 scrollbook');		
		Orion.DropDraggedItem(regmythical);
	    Orion.Wait(drop);
}
//
function moveLegendary120()
{
		var legendaryBook = (Orion.ShardName() +" "+ Player.Name() +" " + 'LegendaryBook 120')
		var scroll = Shared.GetVar('scroll1')
		Orion.DragItem(scroll);
		Orion.Wait(drag);
		var reglegendary = (Orion.RegRead(legendaryBook, 'Software\\OrionAssistant\\vars\\JAF\\ScrollBooks'));
		Orion.Print(43, 'Adding 120 scroll '+ (scroll) + ' to ' +(reglegendary) + ' 120 scrollbook');		
		Orion.DropDraggedItem(reglegendary);
	    Orion.Wait(drop);
}		
//		
function movePinks()
{
		var pinkBook = (Orion.ShardName() +" "+ Player.Name() +" " + 'PinkBook')
		var scroll = Shared.GetVar('scroll1')
		Orion.DragItem(scroll);
		Orion.Wait(drag);
		var regpink = (Orion.RegRead(pinkBook, 'Software\\OrionAssistant\\vars\\JAF\\ScrollBooks'));
		Orion.Print(23, 'Adding Pink scroll '+ (scroll) + ' to ' +(regpink) + ' Transcendence scrollbook');		
		Orion.DropDraggedItem(regpink);
	    Orion.Wait(drop);
}
// ******** END ***************************************************************************************************************************	