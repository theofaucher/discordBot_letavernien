module.exports.run = (client, message, args) => {
  
	const { channel } = message.member.voice;
	if (!channel) return  message.channel.send('Tu dois être dans un salon pour que je puisse lire la musique !');
	const serverQueue = message.client.queue.get(message.guild.id);
	if (!serverQueue) return message.channel.send('Ajoute de la musique pour que je puisse passer celle-ci');
	serverQueue.connection.dispatcher.end('Je passe à la prochaine musique !');
  
};
  

module.exports.help = {
	name: "skip",
	aliases: ['passe'],
	description: "Passe à la prochaine musique",
	cooldown: 3,
	usage: '',
	adminCommand: false,
	permissions: false,
	args: false
  };
  