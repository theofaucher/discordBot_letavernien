const { Collection } = require('discord.js');

module.exports = (client, message) => {

  if (message.channel.type === 'dm') return
  if (!message.content.startsWith(client.prefix) || message.author.bot || message.content == client.prefix) return;
  
  const args = message.content.slice(client.prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  const user = message.mentions.users.first();

  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName));
  if (!command){

    message.delete({timeout:7000})
    message.reply('Cette commande n\'existe pas ou est desactivée: ?help pour obtenir la liste des commandes disponibles').then(message => {message.delete({ timeout: 7000})}).catch()
    return;

  }

  if(command.help.permissions && !command.help.permissions.find(element => element == message.member.roles.cache.first().id) || command.help.adminCommand && !message.member.hasPermission('ADMINISTRATOR')) {
   
    message.delete({timeout:3000})
    message.reply('Tu n\'a pas la permission d\'executer cette commande').then(message => {message.delete({ timeout: 3000})}).catch()
    return;

  }
  
  if (command.help.args && !args.length) {
    let noArgsReply = `Il faut des arguments pour cette commande, ${message.author}!`;

    if (command.help.usage) noArgsReply += `\nVoici comment utiliser la commande: \`${client.prefix}${command.help.name} ${command.help.usage}\``;

    return message.channel.send(noArgsReply);
  };
  
  if (command.help.isUserAdmin && !user) return message.reply('Il faut mentionner un utilisateur.');

  if (!client.cooldowns.has(command.help.name)) {
    client.cooldowns.set(command.help.name, new Collection());
  };

  const timeNow = Date.now();
  const tStamps = client.cooldowns.get(command.help.name);
  const cdAmount = (command.help.cooldown || 5) * 1000;

  if (tStamps.has(message.author.id)) {
    const cdExpirationTime = tStamps.get(message.author.id) + cdAmount;

    if (timeNow < cdExpirationTime) {
      timeLeft = (cdExpirationTime - timeNow) / 1000;
      return message.reply(`Merci d'attendre ${timeLeft.toFixed(0)} seconde(s) avant de ré-utiliser la commande \`${command.help.name}\`.`);
    };
  };

  tStamps.set(message.author.id, timeNow);
  setTimeout(() => tStamps.delete(message.author.id), cdAmount);

  command.run(client, message, args);
}