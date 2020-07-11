module.exports.run = (client, message, args) => {
  
	const { channel } = message.member.voice;
	if (!channel) return message.channel.send('Tu dois être dans un salon pour executer cette commande !');
	const serverQueue = message.client.queue.get(message.guild.id)
	if (!serverQueue) return message.channel.send('Aucune lecture en cours');
	serverQueue.songs = [];
	serverQueue.connection.dispatcher.end('J\'arrête la musique');

};
  

module.exports.help = {
	name: "stop",
	aliases: ['arret'],
	description: "Quitte le salon",
	cooldown: 3,
	usage: '',
	adminCommand: false,
	permissions: false,
	args: false
  };
  