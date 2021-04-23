const { Client } = require("discord.js");
const { config } = require("dotenv");

const client = new Client({
    disableEveryone: true // prevents the client from pinging @everyone
});

config({
    path: __dirname + "/.env"
})

client.on("ready", () => {
    console.log("-----------------------");
    console.log("      Zen Network");
    console.log("    Created by 4Remi");
    console.log("-----------------------");

    client.user.setPresence({
        status: "dnd",
        game: {
            name: "Zen Network by 4Remi",
            type: "WATCHING"
        }
    });
})

client.on("message", async message => {
    const prefix = ">";

    if (message.author.bot) return; // If the author is a bot, return
    if (!message.guild) return; // If the message was not sent in a server, return
    if (!message.content.startsWith(prefix)) return; // If the message doesn't start with the prefix, return

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd === "ping") {
        const msg = await message.channel.send(`Loading latency...`);

        msg.edit(`Latency is ${Math.floor(msg.createdTimestap - message.createdTimestap)}ms\nBot Latency is ${Math.round(client.ping)}ms`);
    }
});

client.login(process.env.TOKEN);