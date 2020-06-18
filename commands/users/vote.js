const { MessageEmbed, MessageReaction } = require("discord.js");

module.exports.run = async (client,message,args) => {
    
    let totalTime;
    let argsRaw = args.join(' ');
    let argsPreProcessing = argsRaw.split('\"');
    let argsPostProcessing = [];

    for(let counter = 0; counter < argsPreProcessing.length; counter ++){

        if(argsPreProcessing[counter] != " ") argsPostProcessing.push(argsPreProcessing[counter].trim());
    
    }

    console.log(argsPostProcessing)
    // if(argsPostProcessing == )

    let voteQuestion = argsPostProcessing[1];
    let voteResponse1 = argsPostProcessing[2];
    let voteResponse2 = argsPostProcessing[3];
    let voteResponse3 = argsPostProcessing[4];
    let voteResponse4 = argsPostProcessing[5];
    console.log(voteQuestion)
    console.log(voteResponse1)
    console.log(voteResponse2)
    console.log(voteResponse3)
    console.log(voteResponse4)

    let voteTime = argsPostProcessing[argsPostProcessing.length-1];

    if (voteTime){

        let secondsTime = voteTime.split(':')[2];
        let minsTime = voteTime.split(':')[1];
        let hoursTime = voteTime.split(':')[0];
        totalTime = ((parseInt(hoursTime)*3600) + (parseInt(minsTime)*60) + parseInt(secondsTime)) *1000;

    }

    const embed = new MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setColor("#ad14da")
    .setTitle(voteQuestion)
    .setDescription("Ajoute une réaction pour répondre au vote")

    if(voteResponse1 != '' && voteResponse2 != '' && voteResponse3 == '' && voteResponse4 == ''){

        embed.addFields({value:`1️⃣ ${voteResponse1} \n 2️⃣ ${voteResponse2}`})

    }
    if(voteResponse1 != '' && voteResponse2 != '' && voteResponse3 != '' && voteResponse4 == ''){

        embed.addFields({value:`1️⃣ ${voteResponse1} \n 2️⃣ ${voteResponse2} \n 3️⃣ ${voteResponse3}`})

    } 
    if(voteResponse1 != '' && voteResponse2 != '' && voteResponse3 != '' && voteResponse4 != ''){

        embed.addFields({value:`1️⃣ ${voteResponse1} \n 2️⃣ ${voteResponse2} \n 3️⃣ ${voteResponse3} \n 4️⃣ ${voteResponse4}`})

    } 

    if(!voteTime){

        await message.channel.send(embed).then(async message => {
            

            if(voteResponse1 != '' && voteResponse2 != '' && voteResponse3 == '' && voteResponse4 == ''){

                await message.react("1️⃣");
                await message.react("2️⃣");
        
            }
            if(voteResponse1 != '' && voteResponse2 != '' && voteResponse3 != '' && voteResponse4 == ''){
        
                await message.react("1️⃣");
                await message.react("2️⃣");
                await message.react("3️⃣");
        
            } 
            if(voteResponse1 != '' && voteResponse2 != '' && voteResponse3 != '' && voteResponse4 != ''){
        
                await message.react("1️⃣");
                await message.react("2️⃣");
                await message.react("3️⃣");
                await message.react("4️⃣");
        
            }
        
        }).catch();
        
    }
    else{

        await message.channel.send(embed).then(async message => {
            
            message.delete({ timeout: totalTime})
            if(voteResponse1 != '' && voteResponse2 != '' && voteResponse3 == '' && voteResponse4 == ''){

                await message.react("1️⃣");
                await message.react("2️⃣");
        
            }
            if(voteResponse1 != '' && voteResponse2 != '' && voteResponse3 != '' && voteResponse4 == ''){
        
                await message.react("1️⃣");
                await message.react("2️⃣");
                await message.react("3️⃣");
        
            } 
            if(voteResponse1 != '' && voteResponse2 != '' && voteResponse3 != '' && voteResponse4 != ''){
        
                await message.react("1️⃣");
                await message.react("2️⃣");
                await message.react("3️⃣");
                await message.react("4️⃣");
        
            }

            message.awaitReaction().then(collected => {

                const reaction = collected.first()

                console.log(reaction)
                // switch(reaction.emoji.name){

                //     case '1️⃣':

                //     case '2️⃣':

                //     case '3️⃣':

                //     case '4️⃣':



                // }

            })
        
        }).catch();

    }

     
}

module.exports.help = {

    name: 'vote',
    aliases: ['strawpoll', 'poll'],
    description: 'Permet de créer des strawpoll, tu peux avoir jusqu\'à 4 réponses',
    usage: '<question> <réponse 1> <réponse 2> <réponse 3> <réponse 4> <Si vous voulez limiter le temps: HH:MM:SS>',
    cooldown: 10,
    args: true,
    adminCommand: true,
    permissions: [
            "563780818233720832",
            "695022628653629511",
            "695318063570092153",
            "695333782844211341"
        ]

}