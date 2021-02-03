const {  MessageReaction } = require("discord.js");

module.exports = async function (client, member){

    client.guilds.cache.find(element => element == '563780601807896586').setName(`LA TAVERNE - ${client.guilds.cache.find(element => element == '563780601807896586').memberCount}`)    

}