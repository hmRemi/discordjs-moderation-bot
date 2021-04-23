module.exports = {
    name: "ping",
    category: "info",
    description: "Returns latency and API ping",
    run: async (client, message, args) => {
        const msg = await message.channel.send(`Checking latency...`);

        msg.edit(`
        Latency is ${Math.floor(msg.createdTimestap - message.createdTimestap)}ms
        API Latency is ${Math.round(client.ping)}ms`);
    }
}