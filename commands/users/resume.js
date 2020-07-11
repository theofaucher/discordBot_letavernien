module.exports.run = (client, message, args) => {
  
    const serverQueue = message.client.queue.get(message.guild.id);
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return message.channel.send('▶ Je reprend la lecture!');
		}
		return message.channel.send('Il n\'y a rien à jouer');
  
};
  

module.exports.help = {
	name: "resume",
	aliases: ['reprend'],
	description: "Reprend la lecture de la musique",
	cooldown: 3,
	usage: '',
	adminCommand: false,
	permissions: false,
	args: false
  };
  