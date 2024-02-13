const { Client, Events, GatewayIntentBits } = require("discord.js")
const token = "Bot MTEyMzAwNTQxMzQyMDQzMzQ0OA.GFaLaz._6ss_bZAERLi5Q8629yr10g5yYHTNmOlivfmV0"
const express = require("express")
const app = express()
const channelid = "1124281822663155763"
const roleid = "1125104903820431372"
const guildid = "827828968236908544"
app.use(express.json())

app.listen(8080, () => {
	console.log("Project is running!")
})

app.get("/", (req, res) => {
	res.send("hello world")
})

app.post("/send-msg", (req, res) => {
	const { message } = req.body
	if (!message) {
		console.log({ 'message': 'No message received' })
		res.status(418).send({ 'message': 'No message received' })
	}
	client.guilds.cache.get(guildid).roles.fetch(roleid).then(role => {
		if (role.permissions.has("Administrator")) {
			const channel = client.channels.cache.get(channelid)
			channel.send(message)
			console.log({ 'message': 'Successful request' })
			res.status(200).send({ 'message': 'Successful request' })
		}
		else {
			console.log({ 'message': 'Insufficient permissions!' })
			res.status(418).send({ 'message': 'Insufficient permissions!' })
		}
	})
})

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`)
});

client.login(token)