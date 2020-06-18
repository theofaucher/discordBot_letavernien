module.exports.run = (client, message, args) => {
  message.channel.send("Pong!");
};

module.exports.help = {
  name: "ping",
  aliases: ['ping','aide'],
  description: "Renvoie ton ping avec une petite réaction selon ta personne!",
  cooldown: 10,
  usage: '',
  adminCommand: false,
  permissions: false,
  args: false
};
