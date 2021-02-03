const fetch = require('node-fetch');

module.exports.run = async (client, message, args) => {
  
	const infos = await fetch(`http://ip-api.com/json/${args[0]}`);
	const infos_json = await infos.json();
    message.reply(`Cette personne habite à ${infos_json.city} en ${infos_json.country} (${infos_json.countryCode}), son opérateur est ${infos_json.isp}.`)

};
  

module.exports.help = {
	name: "ip",
	aliases: [''],
	description: "Donne des infos à propos d'une ip particulière",
	cooldown: 5,
	usage: '<ip>',
	adminCommand: false,
	permissions: false,
	args: true
  };
  