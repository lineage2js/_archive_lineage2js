let world = require("./World");
let serverPacket = require("./serverPackets/serverPackets");
let NPC = require("./NPC");

const { Worker } = require('worker_threads')



class Tasks {
	
	runTask(workerName, workerData) {
	  return new Promise((resolve, reject) => {
		const worker = new Worker('./gameserver/Tasks/'+workerName+'.js', { workerData });
		//console.info(`Starting Task ${workerName} ${worker.threadId}`);
		
		worker.on('message', resolve);
		worker.on('error', reject);
		worker.on('exit', (code) => {
		  if (code !== 0)
			reject(new Error(`Worker ${workerName} stopped with exit code ${code}`));
		})
	  })
	}

	
	async startNpcMove() {
		
		try{
			const npcList = world.getNpcList(); 
			const moveNpc = await this.runTask('npcMove',npcList)
			//const moveNpc = await this.runService('npcMove',null)

			for(var i in moveNpc){
				let npc = new NPC(moveNpc[i].npc);
				let position = moveNpc[i].position;
				npc.getVisibleObjects(world.getPlayers(), player => {
					player.sendPacket(new serverPacket.MoveToLocation(position, npc));
				})
			}
			
			//where we go again
			setTimeout(()=>{
				this.startNpcMove();
			},500); //500ms delay
		}
		catch(err){
			console.error(err);
		}
	}
}

module.exports = new Tasks();