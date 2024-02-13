const { Client, Events, GatewayIntentBits } = require("discord.js")
const token = process.env.TOKEN
const express = require("express")
const app = express()
const channelid = process.env.CHANNEL_ID
const roleid = process.env.ROLE_ID
const guildid = process.env.GUILD_ID
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
