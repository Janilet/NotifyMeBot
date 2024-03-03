const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addstreamer')
        .setDescription('Add a Twitch streamer to monitor'),
    
    async run({ interaction }) {
        // Create a modal for adding a Twitch streamer
        const modal = new ModalBuilder()
            .setCustomId('addStreamerModal')
            .setTitle('Add Twitch Streamer');

        // Create the text input component for streamer username
        const addStreamerInput = new TextInputBuilder()
            .setCustomId('streamer_username') // Custom ID for the input
            .setLabel("Twitch Username") // Prompt for the user
            .setStyle(TextInputStyle.Short); // Short style for single-line input

        const addChannelInput = new TextInputBuilder()
            .setCustomId('channel_name') // Custom ID for the select menu
            .setLabel("Provide channel you want the notification on?") // Prompt for the user
            .setStyle(TextInputStyle.Short); // Short style for single-line input

        // const addLogInput = new TextInputBuilder()
        // .setCustomId('log_channel') // Custom ID for the select menu
        // .setLabel("Provide channel you want the bot to log?") // Prompt for the user
        // .setStyle(TextInputStyle.Short); // Short style for single-line input

		// Create an action row with the text input component
        const firstActionRow = new ActionRowBuilder().addComponents(addStreamerInput);

        // Create an action row with the dropdown menu component
        const secondActionRow = new ActionRowBuilder().addComponents(addChannelInput);

        // Create an action row with the dropdown menu component
        // const thirdActionRow = new ActionRowBuilder().addComponents(addLogInput);

        // Add inputs to the modal
		modal.addComponents(firstActionRow, secondActionRow /* , thirdActionRow */);

        // Show the modal to the user
        await interaction.showModal(modal);
    },
};
