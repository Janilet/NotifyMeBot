const { ApiClient } = require('twitch');
const { StaticAuthProvider } = require('twitch-auth');
const axios = require('axios');
let previouslyLiveStreamers = new Set(); // Maintain a set to keep track of streamers who were previously live

async function getTwitchAccessToken() {
    const tokenEndpoint = 'https://id.twitch.tv/oauth2/token';
    const requestBody = {
        client_id: process.env.TWITCH_ID,
        client_secret: process.env.TWITCH_TOKEN,
        grant_type: 'client_credentials'
    };

    try {
        const response = await axios.post(tokenEndpoint, requestBody);
        return response.data;
    } catch (error) {
        throw new Error('Failed to obtain Twitch access token');
    }
}

async function areAnyStreamsLive(TwitchAPI, client, twitchStreamers, channelName, logChannel) {
    let isStreaming = false;
    for (const streamer of twitchStreamers) {
        const isLive = await isStreamLive(TwitchAPI, streamer);
        //Get channels to notify about who is streaming
        const findChannel = client.channels.cache.find((ch) => ch.name === channelName.at(0).toLowerCase());
        if (!findChannel){
            return console.log(`Channel ${channelName} not found.`);
        }
        if (isLive && !previouslyLiveStreamers.has(streamer)) {
            const channel = client.channels.cache.get(findChannel.id);
            channel.send(`${streamer} is live now! Go check out their stream at https://www.twitch.tv/${streamer}`);
            previouslyLiveStreamers.add(streamer);
            isStreaming = true;
        } else if (!isLive && previouslyLiveStreamers.has(streamer)) {
            previouslyLiveStreamers.delete(streamer);
        }
    }
    return isStreaming;
}

async function isStreamLive(TwitchAPI, username) {
    const user = await TwitchAPI.helix.users.getUserByName(username);
    if (!user) {
        return false;
    }
    const stream = await user.getStream();
    console.log(`${username} is live:`, stream !== null);
    return stream !== null;
}

async function setupTwitchIntegration(client, twitchStreamers, channelName, logChannel) {
    // Setup Twitch integration here
    const { access_token } = await getTwitchAccessToken();
    const authProvider = new StaticAuthProvider(process.env.TWITCH_ID, access_token);
    const TwitchAPI = new ApiClient({ authProvider });
    try {
        // Start a timer to check Twitch streamers periodically
        setInterval(() => areAnyStreamsLive(TwitchAPI, client, twitchStreamers, channelName, logChannel), 60000); // Check every minut
    } catch (error) {
        console.error('Error initializing Twitch API:', error.message);
    }
}

module.exports = {
    getTwitchAccessToken,
    areAnyStreamsLive,
    isStreamLive,
    setupTwitchIntegration
};