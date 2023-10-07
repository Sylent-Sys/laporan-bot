import { dirname, importx } from "@discordx/importer";
import type { Interaction, Message } from "discord.js";
import { IntentsBitField } from "discord.js";
import { Client } from "discordx";
import EnvService from "./services/env.service";

export const bot = new Client({
    botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)],
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMessageReactions,
        IntentsBitField.Flags.GuildVoiceStates,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildVoiceStates
    ],

    silent: false,

    simpleCommand: {
        prefix: "!",
    },
});

bot.once("ready", async () => {
    await bot.guilds.fetch();
    await bot.initApplicationCommands();
    console.log("Bot started");
});

bot.on("interactionCreate", (interaction: Interaction) => {
    bot.executeInteraction(interaction);
});

bot.on("messageCreate", (message: Message) => {
    bot.executeCommand(message);
});

async function run() {
    await importx(`${dirname(import.meta.url)}/{events,commands}/**/*.{ts,js}`);
    if (!EnvService.get('BOT_TOKEN')) {
        throw Error("Could not find BOT_TOKEN in your environment");
    }
    await bot.login(EnvService.get('BOT_TOKEN') ?? "");
}

run();