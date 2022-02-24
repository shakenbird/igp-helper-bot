const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Create an embed")
    .setDefaultPermission(true)
    .addStringOption(option => option
      .setName('name')
      .setDescription('Name to send the embed as')
      .setRequired(true))
    .addStringOption(option => option
      .setName('title')
      .setDescription('Embed title.')
      .setRequired(false))
    .addStringOption(option => option
      .setName('description')
      .setDescription('Embed description.')
      .setRequired(false))
    .addStringOption(option => option
      .setName('timestamp')
      .setDescription('Embed timestamp.')
      .setRequired(false)
      .addChoice('true', 'true')
      .addChoice('false', 'false'))
    .addStringOption(option => option
      .setName('color')
      .setDescription('Embed color.')
      .setRequired(false))
    .addStringOption(option => option
      .setName('author')
      .setDescription('Embed author.')
      .setRequired(false))
    .addStringOption(option => option
      .setName('footer')
      .setDescription('Embed footer.')
      .setRequired(false)),
  run: async (interaction) => {
    try {
      interaction.deferReply({ ephemeral: true })
      let name = interaction.options.getString("name")
      let title = interaction.options.getString("title") || undefined
      let description = interaction.options.getString("description") || undefined
      let timestamp = interaction.options.getString("timestamp") || undefined
      let color = interaction.options.getString("color") || "BLACK"
      let author = interaction.options.getString("author") || undefined
      let footer = interaction.options.getString("footer") || undefined
      if (!title && !description && !author && !footer) return interaction.reply({ content: "Provide at least 1 field to send in the embed.", ephemeral: true })
      let mainEmbed = new MessageEmbed()
        .setTitle(title)
        .setDescription(description)
        .setColor(color.toString().toUpperCase())
        .setAuthor({ name: author })
        .setFooter({ text: footer })
      interaction.channel.createWebhook(name, {
        avatar: 'https://global.shakenbird.repl.co/assets/zachyfoxmgmt.png',
      }).then(webhook =>
        webhook.send({ embeds: [mainEmbed] }).then(() => {
          interaction.followUp({
            content: `Embed sent in <#${interaction.channel.id}>`,
            ephemeral: true
          })
        }))
    } catch (err) {
      console.log(err)
    }
  }
}
