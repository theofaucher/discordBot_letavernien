module.exports.run = async (client,message,args) => {

        const serverQueue = message.client.queue.get(message.guild.id);
		if (!serverQueue) return message.channel.send('Il n\'y a rien à jouer');
		return message.channel.send(`
        
            __**Playlist:**__
            ${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
            **Actuellement:** ${serverQueue.songs[0].title}
		`);
     
}

module.exports.help = {

    name: 'queue',
    aliases: [''],
    description: 'Permet de créer des strawpoll, tu peux avoir jusqu\'à 4 réponses',
    usage: '<question> <réponse 1> <réponse 2> <réponse 3> <réponse 4> <Si vous voulez limiter le temps: HH:MM:SS>',
    cooldown: 10,
    args: false,
    adminCommand: true,
    permissions: [
            "563780818233720832",
            "695022628653629511",
            "695318063570092153",
            "695333782844211341"
        ]

}