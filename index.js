const { Client } = require("discord.js");
const { config } = require("dotenv");

const client = new Client({
    disableEveryone: true // prevents the client from pinging @everyone
});

/*
    Collections
 */

client.commands = new Collection();
client.aliases = new Collection();

config({
    path: __dirname + "/.env"
})

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

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

    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);
    let (!command) command = client.commands.get(client.aliases.get(cmd));

    if(command)
        command.run(client, message, args);

});

client.login(process.env.TOKEN);