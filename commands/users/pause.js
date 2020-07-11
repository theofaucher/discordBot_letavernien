module.exports.run = (client, message, args) => {
  
	const serverQueue = message.client.queue.get(message.guild.id);
	if (serverQueue && serverQueue.playing) {
		serverQueue.playing = false;
		serverQueue.connection.dispatcher.pause();
		return message.channel.send('⏸ La musique est en pause!');
	}
	return message.channel.send('Il n\'y a rien à jouer');

};
  

module.exports.help = {
	name: "pause",
	aliases: [''],
	description: "Met la musique en pause",
	cooldown: 3,
	usage: '',
	adminCommand: false,
	permissions: false,
	args: false
  };
  