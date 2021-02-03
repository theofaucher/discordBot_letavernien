module.exports = (client) => {

  setInterval(function(){client.user.setActivity(`${client.prefix}help`, { type: "LISTENING"})},3000);
  client.guilds.cache.find(element => element == '563780601807896586').setName(`LA TAVERNE - ${client.guilds.cache.find(element => element == '563780601807896586').memberCount}`)
  console.log(`Logged in as ${client.user.tag}!`);
  
}