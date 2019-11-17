const { RichEmbed } = require("discord.js");
const { red, orange } = require("../../colors.json");
const { readdirSync } = require('fs');
const { stripIndents } = require("common-tags");

  module.exports = {
    config: {
      name: 'help',
      aliases: ['commandhelp', 'commands'],
      usage: '^help [command name or alias]',
      description: 'Displays the commands or gives the command information',
      category: 'Miscellaneous',
      accessableby: 'Users'
    },
    
  run: async (client, message, args) => {
    let embed = new RichEmbed()
      .setColor(orange)
      .setAuthor(`${client.user.tag} Help`, client.user.displayAvatarURL)
    
      if(!args[0]) {
        const categories = readdirSync("./commands/")
        
        embed.setDescription(`Command list for ${client.user.tag}. The prefix is: \`^\``)
        embed.setFooter(`Command Size: ${client.commands.size} | A Fueled Development © Project`);
        
        categories.forEach(category => {
          const dir = client.commands.filter(c => c.config.category === category)
          const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1)
            try {
              embed.setThumbnail(client.user.displayAvatarURL)
              embed.addField(`**❯ ${capitalise} [${dir.size}]:**`, dir.map(c => `\`${c.config.name}\``).join(" "))  
            } catch(e) {
              
            }
        })
        return message.channel.send(embed)
      } else {
        let command = client.commands.get(client.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
        if(!command) {
          embed.setTitle('Invaild Command!')
          embed.setThumbnail(client.user.displayAvatarURL)
          embed.setDescription(`\`${args.slice(0).join(" ")}\` isn't a command. Do this command again but with no arguments to see the commands.`)
          embed.setColor(red)
          message.channel.send(embed)
        }
        command = command.config
        embed.setAuthor(`${command.name.slice(0,1).toUpperCase() + command.name.slice(1)} Help`, client.user.displayAvatarURL)
        embed.setThumbnail(client.user.displayAvatarURL)
        embed.setDescription(stripIndents `

        **Command Name:** ${command.name}
        **Command Aliases:** ${command.aliases ? command.aliases.join(", ") : 'No alias.'}
        **Command Usage:** ${command.usage ? `\`${command.usage}\`` : 'No usage.'}
        **Command Description:** ${command.description || 'No description.'}
        **Command Category:** ${command.category || 'No category.'}
        **Command Accessableby:** ${command.accessableby || 'No group provided.'}`)  
        
        return message.channel.send(embed)
      }
    }
  }