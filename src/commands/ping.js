const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js"); 
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong"),
  run: async (interaction) => {
    await interaction.reply({ content: `Pong!` })
  }
}