require("dotenv").config();
const Discord=require("discord.js");
const joke=require("one-liner-joke");
const factsGenerator=require("facts-generator");

const client=new Discord.Client({
    intents:[
        "GUILDS",//server
        "GUILD_MESSAGES"//server messages
    ]
});//to access api
client.on("ready",()=>{//when the bot is logged in the server
    console.log(`Logged in as ${client.user.tag}`); //bot username
})

client.on("messageCreate",(msg)=>{
    if(msg.content===">hi"){
        msg.reply(`Hello ${msg.author.username}. I am Kurama! Type >help to know about the commands`);
       // console.log(msg.author.username);
    }else if(msg.content===">joke"){
        msg.reply(joke.getRandomJoke().body);
    }else if(msg.content===">fact"){
        let fetchFact=factsGenerator.getFact();
        msg.reply(fetchFact.fact);
    }else if(msg.content===">help"){
        msg.reply("1.>hi:Say hi to me.")
        msg.reply("2.>joke:Will tell you a random joke.")
        msg.reply("3.>fact:Amazing fact each day.")
    }
})
client.login(process.env.TOKEN);//logging in the bot