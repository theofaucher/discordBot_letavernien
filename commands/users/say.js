
module.exports.run = async(client, message, args) => {
    
   message.delete()
   return message.channel.send(args.join(' '))
	
};
 


module.exports.help = {
	name: "say",
	aliases: ['dire'],
	description: "Fait parler le bot",
	cooldown: 5,
	usage: '"texte"',
	adminCommand: true,
	permissions: false,
	args: true
  };
  