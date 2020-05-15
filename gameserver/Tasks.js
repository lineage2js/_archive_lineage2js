let world = require("./World");
let serverPacket = require("./serverPackets/serverPackets");

class Tasks {
	startNpcMove() {
		// test
		setInterval(() => {
			let npcList = world.getNpcList();

			for(let i = 0; i < npcList.length; i++) {
				let npc = npcList[i];
				let [x, y] = npc.getRandomPos();
				let origin = {
					x: npc.x,
					y: npc.y,
					z: npc.z
				}		
				let position = {
					target: {
						x: npc.x = x,
						y: npc.y = y,
						z: npc.z
					},
					origin: {
						x: origin.x,
						y: origin.y,
						z: origin.z
					}
				}

				npc.getVisibleObjects(world.getPlayers(), player => {
					player.sendPacket(new serverPacket.MoveToLocation(position, npc));
				})
			}
		}, 10000)
		//
	}
}

module.exports = new Tasks();