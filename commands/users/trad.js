

module.exports.run = async (client, message, args) => {
  
 console.log(args.join(' ').spli(''))

};
  

module.exports.help = {
	name: "trad",
	aliases: ['traduction'],
	description: "Permet de traduire du texte",
	cooldown: 5,
	usage: '"texte" <langue entrée> <langue sorti> langue disponible auto(seulement en entrée) DE EN FR ES IT NL PL',
	adminCommand: true,
	permissions: false,
	args: true
  };
  