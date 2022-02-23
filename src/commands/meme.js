const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const request = require('snekfetch');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("meme")
    .setDescription("Get a Reddit meme"),
  run: async (interaction) => {
    interaction.deferReply()
    try {
      const { body } = await request
        .get('https://www.reddit.com/r/dankmemes.json?sort=top&t=week')
        .query({ limit: 800 });
      const allowed = interaction.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
      if (!allowed.length) return interaction.reply({ content: "An error occurred while fetching memes.", ephemeral: true });
      else {
        const randomnumber = Math.floor(Math.random() * allowed.length)
        const embed = new MessageEmbed()
          .setColor(interaction.member.displayColor)
          .setTitle(allowed[randomnumber].data.title)
          .setDescription("Posted by " + allowed[randomnumber].data.author)
          .setImage(allowed[randomnumber].data.url)
          .addField("Info", "Upvotes: " + allowed[randomnumber].data.ups + " / Comments: " + allowed[randomnumber].data.num_comments)
        interaction.editReply({ embeds: [embed] })
      }
    } catch (err) {
      return console.log(err)
    }
  }
}