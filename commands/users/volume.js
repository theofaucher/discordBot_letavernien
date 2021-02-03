module.exports.run = (client, message, args) => {
  
	const { channel } = message.member.voice;
	if (!channel) return  message.channel.send('Tu dois être dans un salon pour que je puisse lire la musique !');
	const serverQueue = message.client.queue.get(message.guild.id);
	if (!serverQueue) return message.channel.send('Il n\'y a rien à jouer');
	if (!args[0]) return message.channel.send(`Le volume actuelle est de: **${serverQueue.volume}**`);
	if (args[0] > 11) return message.channel.send('Je préfère que tu gardes tes tympans')
	if (args[0] < 0) return message.channel.send('T\'es bourré(e) ou quoi ? Du son négatif PTDR')
	serverQueue.volume = args[0];
	serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
	return message.channel.send(`Le volume actuelle est de: **${args[0]}**`);
};
  

module.exports.help = {
	name: "volume",
	aliases: [''],
	description: "Volume du son",
	cooldown: 3,
	usage: '<Entre 1 et 10>',
	adminCommand: false,
	permissions: false,
	args: false
  };
  