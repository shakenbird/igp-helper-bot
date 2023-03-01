const { Intents } = require("discord.js");
require('dotenv').config()

const config = {
  bot: {
    token: process.env.BOT_TOKEN,
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.DIRECT_MESSAGES], // You can find the available intents on https://discord.js.org/#/docs/main/stable/class/Intents?scrollTo=s-FLAGS // Update this field to only register commands a guild, this will make the commands to load instantly in the selected gulld (Optional)
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    mongoUrl: process.env.MONGO_URI,
  },
  msg: {
    err: "Something went wrong while executing this command.",
    perms: "You are missing the required permission(s) to run this command."
  }
};

module.exports = config;