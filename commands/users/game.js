const { MessageEmbed } = require("discord.js");
const { DynamicMessage, OnReaction } = require('discord-dynamic-messages');

module.exports.run = async (client, message, args) => {

	args[0] = parseInt(args[0])
	if(isNaN(args[0])) return message.reply('Il faut un nombre en argument pour cette commande !')
	if(message.channel.parentID != '692469468013527132') return message.delete()
	if(args[0] > 15 ) args[0] = 15
	if(args[0] < 1) args[0] = 1

	const exampleEmbed = new MessageEmbed()
	.setColor('#0099ff')
	.setTitle(`Vous voulez jouer à  ${message.channel.name} ?`)
	.setDescription('Si vous voulez jouer, réagissez à ce message')
	.addField('Personnes souhaitant jouer', 1, true)
	.setTimestamp()
	.setFooter(message.author.username);

	message.channel.send(exampleEmbed).then(async msg =>{
		await msg.react('🎮')
		msg.pin({ reason: 'important' })
		const filter = (reaction, user) => reaction.emoji.name === '🎮';
		const collector = msg.createReactionCollector(filter, {
			time: args[0]*60000, dispose: true
		});
		collector.on('collect', r => {
			if(!r.users.cache.get(message.author.id)){
				exampleEmbed.fields[0].value = parseInt(exampleEmbed.fields[0].value) + 1
				msg.edit(exampleEmbed)
			}
		})
		collector.on('end', collected => {
			msg.delete()
			if(!collected.get('🎮')) return message.reply('Désolé, tu es le seul à vouloir jouer')
			let messageJoueurs = 'Amusez-vous bien: '
			collected.get('🎮').users.cache.forEach(element => {
				if(!element.bot){
					if(element.id != message.author.id) messageJoueurs += `<@${element.id}> `
				}
			});

			messageJoueurs += `<@${message.author.id}> `
			message.channel.send(messageJoueurs)
		})
		collector.on('remove', r => {
			if(!r.users.cache.get(message.author.id)){
				exampleEmbed.fields[0].value = parseInt(exampleEmbed.fields[0].value) - 1
				msg.edit(exampleEmbed)
			}
		})
	})

}

module.exports.help = {
	name: "game",
	aliases: ['jeu','partiedejeuvideo', 'jeux'],
	description: "Tu cherches des mates pour jouer ?",
	cooldown: 10,
	usage: '<temps de recherche (en minutes, max: 15 minutes, min: 1 minute)>',
	adminCommand: false,
	permissions: false,
	args: true
  };
  