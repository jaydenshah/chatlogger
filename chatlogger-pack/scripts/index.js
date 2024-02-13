import { world, system } from '@minecraft/server'
import { sendMsg, getTimeString } from './functions.js'

const msg = "[".concat(getTimeString(), " INFO] The server has started again!")
sendMsg(msg)

world.beforeEvents.chatSend.subscribe((eventData) => {
    const player = eventData.sender.name
    const msg = eventData.message
    //const time_str = d.toISOString().substring(0, 10).concat(" ", d.toISOString().substring(11, 23))
    system.run(() => {
        const dmsg = "[".concat(getTimeString(), " CHAT] [", player, "] ", msg)
        console.log(dmsg)
        sendMsg(dmsg)
    })
})

world.afterEvents.entityDie.subscribe((eventData) => {
    try {
        const victim = eventData.deadEntity
        const source = eventData.damageSource
        if (victim.typeId == "minecraft:player") {
            var time_str = getTimeString()
            system.run(() => {
                const dmsg1 = "[".concat(time_str, " DEATH] ", victim.nameTag, " died by ", source.cause, " at (", Math.round(victim.location.x), ", ", Math.round(victim.location.y), ", ", Math.round(victim.location.z), ")")
                const dmsg2 = "[".concat(time_str, " DEATH] ", victim.nameTag, " died by ", source.cause)
                console.log(dmsg1)
                sendMsg(dmsg2)
            })
            system.runTimeout(() => {
                try {
                    const dmsg = "[".concat(time_str, " DEATH CAUSE] from ", source.damagingEntity.typeId, " with name ", source.damagingEntity.nameTag)
                    console.log(dmsg)
                    sendMsg(dmsg)
                }
                catch (err) {
                    const pass = "i do not know the javascript equivalent of the python keyword pass";
                }
            }, 10)
        }
    }
    catch (err) {
        const pass = "i do not know the javascript equivalent of the python keyword pass";
    }
})

world.afterEvents.playerJoin.subscribe((eventData) => {
    const dmsg = "[".concat(getTimeString(), " JOIN] Player connected: ", eventData.playerName)
    system.run(() => {
        sendMsg(dmsg)
    })
})

world.afterEvents.playerLeave.subscribe((eventData) => {
    const dmsg = "[".concat(getTimeString(), " LEAVE] Player disconnected: ", eventData.playerName)
    system.run(() => {
        sendMsg(dmsg)
    })
})

//world.afterEvents.entityHurt.subscribe((eventData) => {
//	const victim = eventData.hurtEntity
//    const source = eventData.damageSource
//    const damage = eventData.damage
//    if (victim.typeId == "minecraft:player") {
//        console.log("[DAMAGE] ".concat(victim.nameTag, " has lost ", damage, " health by ", source.cause))
//        if (source.damagingEntity != undefined) {
//            console.log("[DAMAGE CAUSE] from entityType ".concat(source.damagingEntity.typeId, " with name ", source.damagingEntity.nameTag))
//        }
//    }
//})