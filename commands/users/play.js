const ytdl = require('ytdl-core');
const { YTSearcher } = require('ytsearcher');
const { Util } = require('discord.js');
const { validateURL } = require('ytdl-core');
const env = require('dotenv').config()

module.exports.run = async (client, message, args) => {
 
  const searcher = new YTSearcher(process.env.api_youtube_key);

  const { channel } = message.member.voice;
  if (!channel) return message.channel.send('Tu dois être dans un salon pour que je puisse lire la musique !');
 
  const serverQueue = message.client.queue.get(message.guild.id);
  
  const validate = await ytdl.validateURL(args[0])

  let songInfo;

  if(validate)  songInfo = await ytdl.getInfo(args[0].replace(/<(.+)>/g, '$1'));

  else{
    
    const url = await searcher.search(args.join(' '));
    songInfo = await ytdl.getInfo(url.first.url);
  
  }


  
  const song = {
    id: songInfo.video_id,
    title: Util.escapeMarkdown(songInfo.title),
    url: songInfo.video_url
  };

  if (serverQueue) {
    serverQueue.songs.push(song);
    return message.channel.send(`✅ **${song.title}** est ajouté à la playlist !`);
  }

  const queueConstruct = {
    textChannel: message.channel,
    voiceChannel: channel,
    connection: null,
    songs: [],
    volume: 2,
    playing: true
  };
  message.client.queue.set(message.guild.id, queueConstruct);
  queueConstruct.songs.push(song);

  const play = async song => {
    const queue = message.client.queue.get(message.guild.id);
    if (!song) {
      queue.voiceChannel.leave();
      message.client.queue.delete(message.guild.id);
      return;
    }

    const dispatcher = queue.connection.play(ytdl(song.url))
      .on('finish', () => {
        queue.songs.shift();
        play(queue.songs[0]);
      })
      .on('error', error => console.error(error));
    dispatcher.setVolumeLogarithmic(queue.volume / 5);
    queue.textChannel.send(`🎶 Musique actuelle: **${song.title}**`);
  };

  try {
    const connection = await channel.join();
    queueConstruct.connection = connection;
    play(queueConstruct.songs[0]);
  } catch (error) {
    console.error(`I could not join the voice channel: ${error}`);
    message.client.queue.delete(message.guild.id);
    await channel.leave();
    return message.channel.send(`I could not join the voice channel: ${error}`);
  }

};
  
  module.exports.help = {
    name: "play",
    aliases: ['jouer','joue'],
    description: "Permet d'écouter la musique de ton choix",
    cooldown: 2,
    usage: '<url ou nom de la video',
    adminCommand: false,
    permissions: false,
    args: true
  };
  