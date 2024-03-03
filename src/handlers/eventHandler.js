const { Events } = require('discord.js');

module.exports = (client, twitchStreamers, channelName, logChannel) => {
    client.on(Events.InteractionCreate, async interaction => {
        if (!interaction.isModalSubmit()) return;
        if(interaction.customId === 'addStreamerModal'){
            //TODO: Check if streamer exists Twitch 
            //TODO: If it exists add streammer to database
            await interaction.reply({
                content: 'Your streamer was successfully added!',
            });
        }
        //Get user text input from streamer
        twitchStreamers.push(interaction.fields.getTextInputValue('streamer_username'));
        //Get user text input from channel
        channelName.push(interaction.fields.getTextInputValue('channel_name'));
        //Get user text input for Bot log location
        // logChannel.push(interaction.fields.getTextInputValue('log_channel'));
    });

    client.on('ready', async (c) => {
        console.log(`✅ ${c.user.tag} is online.`);
    });
};