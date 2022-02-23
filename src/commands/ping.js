const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("View the bot's latency"),
  run: async (interaction) => {
    const int = await interaction.reply({ content: "Checking ping...", fetchReply: true })
    await interaction.editReply({ content: `**Bot latency: \`${int.createdTimestamp - interaction.createdTimestamp}ms\`**\n**API latency (websocket): \`${interaction.client.ws.ping}ms\`**` })
  }
}