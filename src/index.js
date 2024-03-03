require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');
const moongoose = require('mongoose');

const eventHandler = require('./handlers/eventHandler');
const { setupCommands } = require('./utils/discordUtils');
const { setupTwitchIntegration } = require('./utils/twitchUtils');

const twitchStreamers = []; // Array to store Twitch streamer usernames
const channelName = []; // Array to store channel names
const logChannel = []; // Array to store bot log

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds, 
        IntentsBitField.Flags.GuildMembers, 
        IntentsBitField.Flags.GuildMessages, 
        IntentsBitField.Flags.MessageContent,
    ]
});

// DATABASE CONNECTION
(async () => {
    try {
        await moongoose.connect(process.env.MONGODB_URI, {

        });
        client.login(process.env.DISCORD_ID);
    }catch(error){
        console.log(`Error: ${error}`);
    }
})();


// Setup Discord interactions
setupCommands(client);

// Setup event handlers
eventHandler(client, twitchStreamers, channelName, logChannel);

// Setup Twitch integration
setupTwitchIntegration(client, twitchStreamers, channelName, logChannel);