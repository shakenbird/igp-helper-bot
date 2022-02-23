const { MessageEmbed, WebhookClient } = require("discord.js")
const axios = require("axios")
const requests = require("requests")
module.exports = {
  event: "interactionCreate", // Name of the event
  oneTime: false, // If set to true the event will only be fired once until the client is restarted
  run: async (i) => {
    if (i.customId === "modal") {
      await axios({
        method: 'POST',
        url: `https://discord.com/api/interactions/${i.id}/${i.token}/callback`,
        headers: {
          "Authorization": `Bot ${i.client.token}`
        },
        data: {
          type: 9,
          data: {
            title: "Testing modal",
            custom_id: "this_modal",
            components: [
              {
                type: 1,
                components: [
                  {
                    type: 4,
                    custom_id: 'hello_modal',
                    label: 'Question 1',
                    style: 1,
                    min_length: 2,
                    max_length: 400,
                    required: true,
                  }
                ]
              }
            ]
          }
        }
      })
      }
    if (!i.isCommand()) return;
    const commandCheck = i.client.commands.get(i.commandName);

    if (!commandCheck) {
      return console.log(`Could not find command" '${i.commandName}'`);
    } else {
      try {
        await commandCheck.run(i);
      } catch (error) {
        console.log(error)
      }
    }
  },
};
