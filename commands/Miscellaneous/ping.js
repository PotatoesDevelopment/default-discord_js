const { RichEmbed } = require("discord.js");
const { orange } = require("../../colors.json");

  module.exports = {
    config: {
      name: 'ping',
      aliases: ['latency', 'ms'],
      usage: '-ping',
      description: 'Displays the bot\'s latency',
      category: 'Miscellaneous',
      accessableby: 'Users'
    },
    
  run: async (client, message, args) => {
    message.channel.send(`${client.emojis.get('645467593830039623')} Pinging...`).then(m => {
      let ping = m.createdTimestamp - message.createdTimestamp
      let embed = new RichEmbed()
        .setColor(orange)
        .setThumbnail('https://cdn.discordapp.com/attachments/645662510636072981/645668612987682836/logo.png')
       // .setTitle(`🏓 | Ping-pong!`)
        .addField('[**__Bot Latency:__**]', `\`${ping}MS\``, true)
        .addField('[**__Response Time:__**]', `\`${Math.round(client.ping)}MS\``, true)
        .addField('[**__Client ID__**]', `\`${client.user.id}\``)
        
      m.delete()
      message.channel.send(embed)
      })
    }
  }
