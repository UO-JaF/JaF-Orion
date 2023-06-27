// JustanotherFace (JaF)'s Hide Shit (people, blue people specifically, along with cusidhes, boras, and a cpl other things) Script
// Ver: 1.1  Date: 06/26/2023 
function JaF_hideshit() {
while (!Player.Dead()){
 target = Orion.FindType('0x0191|0x031A|0x0483|0x00F6|0x033D|0x002F|0x025E|0x029A|0x02C1|0x029B|0x0190|0x025D|0x02EB|0x02EC|0x02CB|0x0115|0x0317|0x060B|0x00B3|0x007A|0x011D|0x02D0', '-1', ground, 'mobile|live|ignorefriends|ignoreself|inlos', 20, 'blue')
        if (target.length > 0 ) {
            for (var i = 0; i < target.length; i++) {
                Orion.Hide(target[i]);
				Orion.Wait(200)
				}
			}
		}
}
