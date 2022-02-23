const { Intents } = require("discord.js");
const token = process.env['token']
const config = {
  bot: {
    token: `${token}`,
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.DIRECT_MESSAGES], // You can find the available intents on https://discord.js.org/#/docs/main/stable/class/Intents?scrollTo=s-FLAGS // Update this field to only register commands a guild, this will make the commands to load instantly in the selected gulld (Optional)
    guildId: `${process.env.guildId}`,
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
  },
};

module.exports = config;