const { RichEmbed } = require('discord.js');
const { orange, red, green } = require('../../colors.json');
const db = require('quick.db');
const ms = require('parse-ms');

  module.exports = {
    config: {
      name: 'crime',
      aliases: ['illegal'],
      usage: '!crime',
      description: 'One way to earn money.',
      category: 'Economy',
      accessableby: 'Users'      
    },
    
  run: async (client, message, args) => {
let r1 = Math.floor(Math.random() * 10) + 1;
let r2 = Math.floor(Math.random() * 10) + 1;
let timeout = 14400000;
let amt = Math.floor(Math.random() * 1000) + 1;
let embed = new RichEmbed()
    
    let hour4 = await db.fetch(`hour4_${message.author.id}`);
  if(hour4 !== null && timeout - (Date.now() - hour4) > 0) {
let time = ms(timeout - (Date.now() - hour4))
  
  embed.setColor(red)
  embed.setDescription(`You can commit a crime again in **${time.hours}h, ${time.minutes}m, and ${time.seconds}s**.`)
    // ₪
    return message.channel.send(embed);
      } else {
        if(r1 === r2) {
          db.add(`usrCash_${message.author.id}`, amt);
          db.set(`hour4_${message.author.id}`, Date.now());
          
          embed.setColor(green)
          embed.setDescription(`You were successful and you earned: **${amt} 𝓐**.`)
          
          return message.channel.send(embed);
        } else {
          db.set(`hour4_${message.author.id}`, Date.now());
          db.subtract(`usrCash_${message.author.id}`, 1000);
          
          embed.setColor(red)
          embed.setDescription(`You were caught and you had to pay: **1000 𝓐**`)
          
          return message.channel.send(embed);
        };
      };
    }
  }