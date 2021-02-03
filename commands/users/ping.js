module.exports.run = (client, message, args) => {
  
  message.delete({timeout:3000})
  message.reply(`ton ping est de ${Date.now() - message.createdTimestamp}ms.`).then(message => {message.delete({ timeout: 3000})}).catch()

};

module.exports.help = {
  name: "ping",
  aliases: [],
  description: "Renvoie ton ping avec une petite réaction selon ta personne!",
  cooldown: 10,
  usage: '',
  adminCommand: false,
  permissions: false,
  args: false
};
