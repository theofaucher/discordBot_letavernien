module.exports.run = (client, message, args) => {
  
    message.channel.send(`Aléatoire: ${args[Math.floor(Math.random() * args.length)]}`)
  
  };
  
  module.exports.help = {
    name: "random",
    aliases: ['aléatoire'],
    description: "Random quelque chose",
    cooldown: 10,
    usage: '<1> <2> <3> <4> <5> ...',
    adminCommand: false,
    permissions: false,
    args: true
  };
  