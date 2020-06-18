const env = require('dotenv').config()

module.exports.run = (client,message,args) => {

    client.destroy()
    client.login(process.env.login)
    client.on('ready', () => {client.user.setActivity(`${client.prefix}help`, { type: "WATCHING"});})
    message.delete({timeout:3000})
    message.reply('J\'ai fini ma pause ✅').then(message => {message.delete({ timeout: 3000})}).catch()

}

module.exports.help = {
    name: "reload",
    aliases: ['reload'],
    description: "Reload le bot",
    cooldown: 10,
    usage: 'reload',
    adminCommand: true,
    permissions: false,
    args: false
  };
  