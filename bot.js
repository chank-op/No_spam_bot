require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const config = require("./config.json");
const { isSpam } = require("./utils/spamHandler");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.on("ready", () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    if (isSpam(message, config)) {
        await message.delete().catch(() => {});
        await message.channel.send(`${message.author} ${config.warnMessage}`);
    }
});

client.login(process.env.DISCORD_TOKEN); // 🔑 loaded from .env
