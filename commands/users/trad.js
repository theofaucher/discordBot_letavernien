require('dotenv').config();
const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const {IamAuthenticator} = require('ibm-watson/auth')


module.exports.run = async(client, message, args) => {

	const langueDisponible = ["de", "en", "fr", "es", "it", "nl", "pl"]

	const regExp = new RegExp(/"([^"\\]*(\\.[^"\\]*)*)"|\'([^\'\\]*(\\.[^\'\\]*)*)\'/);
	const rawPhrase = args.join(" ").match(regExp)[0]
	const phraseAtraduire = rawPhrase.substr(1, rawPhrase.length-2);
	const langueEntree = args[args.length-2].toLowerCase()
	const langueSortie = args[args.length-1].toLowerCase()

	if(!langueDisponible.find(element => element == langueEntree) || !langueDisponible.find(element => element == langueSortie)) return message.reply('La commande est mal formulée')

	const authenticator = new IamAuthenticator({
		apikey: process.env.api_watson_key
	}) 

	const languageTranslator = new LanguageTranslatorV3({
		authenticator: authenticator,
		url: 'https://api.eu-gb.language-translator.watson.cloud.ibm.com/instances/fe817c45-6132-422a-8257-e4cba0f803b5',
		version: '2020-08-29'
	});

	languageTranslator
	.translate({
	  text: phraseAtraduire,
	  source: langueEntree,
	  target: langueSortie,
	})
	.then(response => {
		message.reply(`Voici la tradution \`${response.result.translations[0].translation}\``)
	})
	.catch(error => console.error(error));

};
 
module.exports.help = {
	name: "trad",
	aliases: ['traduction'],
	description: "Permet de traduire du texte",
	cooldown: 5,
	usage: '"texte" <langue entrée> <langue sorti> langue disponible DE EN FR ES IT NL PL',
	adminCommand: true,
	permissions: false,
	args: true
  };
  