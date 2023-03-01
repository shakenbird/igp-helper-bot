const { MessageEmbed } = require('discord.js')

module.exports = {
    event: "threadCreate",
    oneTime: false,
    run: async (thread) => {
        if (thread.parentId === "1079641175130128485") {
            thread.send(`• What is the exact version of Discord.js you are using? Run \`npm list discord.js\` in shell (if applicable)\n• Show the full error as a screenshot, not just the stack trace.\n• Show your code in a codeblock or a screenshot.\n• Provide a detailed explaination of the issue you are having.`)

            let verPromptEmbed = new MessageEmbed()
                .setDescription('*Please send the current version of Discord.js you are using, e.x. 14.7.1* (run `npm list discord.js` in shell):')
            thread.send({ embeds: [verPromptEmbed] }).then((msg) => {
                setTimeout(() => {
                    msg.delete();
                }, 20000)
            })
            const filter = m => m.content.size < 8 || Number.isInteger(parseInt(m.content.charAt(0)))
            const collector = thread.createMessageCollector({ filter, time: 20000 });
          
            collector.on('collect', m => {
                let verEmbed = new MessageEmbed()
                .setDescription(`*This user is running Discord.js version **${m.content}**.*`)
                thread.send({ embeds: [verEmbed] }).then(() => {
                 m.delete();
                })
            });
          
            collector.on('end', collected => {
                console.log(`Collected ${collected.size} items`);
            });
        }
    },
};