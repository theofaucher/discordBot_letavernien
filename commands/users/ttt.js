module.exports.run = (client, message, args) => {
  
    message.channel.send(`Silence ${args[0]}`)

    setTimeout(function () {

        message.channel.send(`Bon toutou ${args[0]}`)

    }, 5000)
  
  };
  
  module.exports.help = {
    name: "ttt",
    aliases: [''],
    description: "Dis tu te tais à une personne en particulier",
    cooldown: 10,
    usage: '<1> <2> <3> <4> <5> ...',
    adminCommand: true,
    permissions: false,
    args: true
  };
  