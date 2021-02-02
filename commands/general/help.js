const { Command } = require('discord-akairo');
const { MessageEmbed } = require("discord.js");

class HelpCommand extends Command {
	constructor() {
		super('help', {
			aliases: ['help', 'h', '?'],
			category: "General",
			description: {
			  content: "Show help command",
			  usage: "help [command name]",
			  example: ["help", "help"]
			},
			args: [{
			  id: "command",
			  type: "commandAlias",
			  default: null
			}]
		});
	}
	
	async exec(msg, { command }) {
	  const em = new MessageEmbed()
	  .setTitle(`${this.client.user.username} Help`, this.client.user.displayAvatarURL({ format: "png" }))
	  .setDescription(`Type ${msg.guild.prefix}help [command name] for more information`)
	  .setFooter(`Req by: ${msg.author.tag}`, msg.author.displayAvatarURL({ format: "png", dynamic: true }))
	  
	  if(!command) {
	    
	  }
	}
	
}
