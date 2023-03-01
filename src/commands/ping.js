const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js"); 
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("View the bot's latency"),
  run: async (interaction) => {
    await interaction.reply({ content: `Pong!` })
  }
}