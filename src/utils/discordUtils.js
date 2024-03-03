const { CommandHandler } = require('djs-commander');
const path = require('path');

function setupCommands(client) {
    new CommandHandler({
        client,
        commandsPath: path.join(__dirname, '../commands'), 
        testServer: process.env.GUILD_ID,
    });
}

module.exports = {
    setupCommands,
};