const Canvas = require("canvas");
const Discord=require("discord.js");
const background = "https://i.imgur.com/qiqyFjp.jpeg"; //background for the canvas
const dim = {
  //dimensions for the canvas/background
  width: 1200,
  height: 675,
  margin: 50,
};
const avatar = {
  size: 256, //size of the avatar image
  x: 480, //x coordinate of the avatar on the canvas
  y: 170, //y coordinate of the avatar on th canvas
};
const generateImage = async (member) => {
  let user = member.user.username; //for getting the name of the user
  let discrim = member.user.discriminator; //numbers at the end of username
  let avatarURL = member.user.displayAvatarURL({
    format: "png",
    dynamic: false,
    size: avatar.size,
  }); //avatar image fetch
  const canvas = Canvas.createCanvas(dim.width, dim.height); //creating the canvas
  const ctx = canvas.getContext("2d"); //use this to draw on canvas
  const backimg =await Canvas.loadImage(background); //loading background image
  ctx.drawImage(backimg, 0, 0); //drawing the backimg on the canvas using ctx 0,0 means top left i.e the origin
  ctx.fillStyle="rgba(0, 0, 0, 0.8)"; //this creates black color for us to use
  
  ctx.fillRect(
    dim.margin,
    dim.margin,
    dim.width - 2 * dim.margin,
    dim.height - 2 * dim.margin
  ); //creates the black rectangle at the specified points
  const avatarImg =await Canvas.loadImage(avatarURL); //loading avatar image
  ctx.save(); //saving the current context as we are going to make out avatar image round
  ctx.beginPath(); //starting the rounding process
  ctx.arc(
    avatar.x + avatar.size / 2,
    avatar.y + avatar.size / 2,
    avatar.size / 2,
    0,
    Math.PI * 2,
    false
  ); //cutting the image in round using arc(x coord of center,y coord of center,radius,starting angle,angle to be covered,counterclockwise true or not)
  ctx.closePath();//ending the process
  ctx.clip();//clipping the image
  ctx.drawImage(avatarImg,avatar.x,avatar.y);//drawing avatar image
  ctx.restore();//restoring previous context

  //writing the text
  ctx.fillStyle="white";//color of the font
  ctx.textAlign="center";//centerting all texts

  //writing welcome
  ctx.font="80px Sans";//size and font family
  ctx.fillText("Welcome",dim.width/2,dim.margin+70);
  //writing username in next line
  ctx.font="50px Sans";
  ctx.fillText(user+"#"+discrim,dim.width/2,dim.height-dim.margin-125);
  //writing to the server in next line
  ctx.font="50px Sans";
  ctx.fillText("to the server",dim.width/2,dim.height-dim.margin-25);

const attachment=new Discord.MessageAttachment(canvas.toBuffer(),"welcome.png");//attaching the canvas to the message in discord and storing it in buffer format
return attachment;
};
module.exports=generateImage;
