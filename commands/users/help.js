const { MessageEmbed } = require("discord.js");

module.exports.run = (client,message,args) => {
    
    const command = client.commands.get(args[0]);
    if(command) {
        
        if(client.commands.get(args[0]).help.permissions && !client.commands.get(args[0]).help.permissions.find(element => element == message.member.roles.cache.first().id) || client.commands.get(args[0]).help.adminCommand && !message.member.hasPermission('ADMINISTRATOR')){
            
            message.delete({timeout:5000})
            message.reply('Tu n\'as naturellement pas accès à cette commande').then(message => {message.delete({ timeout: 5000})}).catch()
            return

        }
            const embed = new MessageEmbed()
        .setColor("#ad14da")
        .setTitle(client.prefix+args[0])
        .addField("Description", `${command.help.description}`)
        .addField("Utilisation", `${client.prefix}${command.help.name} ${command.help.usage}`)
        if (command.help.aliases.length >= 1) embed.addField("Alias", `${command.help.aliases.join(', ')}`, true);

        message.channel.send(embed)

    } else if (!command && args.length) message.reply('Cette commande n\'existe pas ou est desactivé: ?help pour voir les commandes disponible')
    else{

        const embed = new MessageEmbed()
        .setColor("#ad14da")
        .setTitle('Commandes disponibles')
        .setFooter('Vous pouvez utiliser toutes les commandes qui sont indiquées ici');
        client.commands.forEach(Eachcommand => {
            
            if(!Eachcommand.help.permissions && !Eachcommand.help.adminCommand || Eachcommand.help.permissions && client.commands.get(Eachcommand.help.name).help.permissions.find(element => element == message.member.roles.cache.first().id) || Eachcommand.help.adminCommand && message.member.hasPermission('ADMINISTRATOR')) embed.addField(Eachcommand.help.name, Eachcommand.help.description);

        });

        message.channel.send(embed)

    }

}

module.exports.help = {
  name: "help",
  aliases: ['aide'],
  description: "Renvoie une liste de commandes ou les informations sur une seule!",
  cooldown: 3,
  usage: '<nom de la commande>',
  adminCommand: false,
  permissions: false,
  args: false
};
