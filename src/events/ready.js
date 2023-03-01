// Util
const ora = require("ora");
const config = require("../..//config");
const fs = require("fs");
const mongoose = require('mongoose');

// Slash Commands
const slash = require("../util/slash");

// CLI
const botLoader = ora("Starting Discord.js Client").start();
const dbLoader = ora("Starting Database").start();

module.exports = {
  event: "ready", // Name of the event
  oneTime: true, // If set to true the event will only be fired once until the client is restarted
  run: async (client) => {

mongoose.connect(`mongodb+srv://shakenbird:${config.bot.mongoUrl}@url-shortener.e5zpppg.mongodb.net/?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  dbLoader.succeed(`Started database`);
});

    const commandFiles = fs
      .readdirSync("./src/commands")
      .filter((file) => file.endsWith(".js"));

    let commandsArray = [];
    commandFiles.forEach((file) => {
      const command = require(`../commands/${file}`);
      client.commands.set(command.data.name, command);

      commandsArray.push(command);
    });


    const finalArray = commandsArray.map((e) => e.data.toJSON());
    slash.register(client.user.id, finalArray);
    botLoader.succeed(`${client.user.tag} Started`);
    client.user.setActivity("hello", { type: "PLAYING" });
    console.log(`\nClient set on ${client.guilds.cache.size} guilds.`);
  },
};
