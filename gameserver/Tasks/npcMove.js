let NPC = require("../NPC");
//let world = require("../World");
//let serverPacket = require("../serverPackets/serverPackets");

const {
  Worker, isMainThread, parentPort, workerData
} = require('worker_threads'); //workerData contains the parameters sent to main thread


const MovePercent = .03; //3%

function shuffle(unshuffled) {
  return unshuffled
  .map((a) => ({sort: Math.random(), value: a}))
  .sort((a, b) => a.sort - b.sort)
  .map((a) => a.value)
}

//let npcList = shuffle(world.getNpcList()); //Shuffling will grant us a random movement.
let npcList = shuffle(workerData); //Shuffling will grant us a random movement.
let maxNpcMove = Math.ceil(MovePercent*npcList.length);



let moveNpc = [];
for(let i = 0; i < maxNpcMove; i++) {
	let npc = new NPC(npcList[i]);
	if(npc.type === "monster" || npc.type === "guard") {
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
		
		//Since there is no shared memory or a microservice for package sending and world reading is not possible send a packet inside a thread
		/*npc.getVisibleObjects(world.getPlayers(), player => {
				player.sendPacket(new serverPacket.MoveToLocation(position, npc));
			})*/
		moveNpc.push({npc:npc, position:position});
	}
}

//parentPort.postMessage(true);//send back a result
parentPort.postMessage(moveNpc);//send back a result