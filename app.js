const { Client, Collection } = require('discord.js');
const env = require('dotenv').config()
const { readdirSync } = require("fs");

const client =  new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
["commands", "cooldowns"].forEach(x => client[x] = new Collection());
client.prefix = process.env.prefix

const loadCommands = (dir = "./commands/") => {
  readdirSync(dir).forEach(dirs => {
    const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));

    for (const file of commands) {
      const getFileName = require(`${dir}/${dirs}/${file}`);
      client.commands.set(getFileName.help.name, getFileName);
      console.log(`Commande chargée: ${getFileName.help.name}`);
    };
  });
};

const loadEvents = (dir = "./events/") => {
  readdirSync(dir).forEach(dirs => {
    const events = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith(".js"));

    for (const event of events) {
      const evt = require(`${dir}/${dirs}/${event}`);
      const evtName = event.split(".")[0];
      client.on(evtName, evt.bind(null, client));
      console.log(`Evenement chargé: ${evtName}`);
    };
  });
};

loadEvents();
loadCommands();

client.login(process.env.login);
client.on('error', () => console.error)
client.on('warn', () => console.warn)