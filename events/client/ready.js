module.exports = (client) => {
  
  client.user.setActivity(`${client.prefix}help`, { type: "LISTENING"});
  console.log(`Logged in as ${client.user.tag}!`);
  
}