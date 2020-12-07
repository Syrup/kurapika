const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const fs = require('fs');

class HelpCommand extends Command {
	constructor() {
		super('help', {
			aliases: ["help", "h", "?"]
		});
		this.name = 'help';
		this.description = "Show list of commands"
		this.usage = "help [command name]"
	}

	exec(message) {
	  let args = message.content
				.slice(this.client.config.defaultPrefix.length)
				.trim()
				.split(/ +/)
				.slice(1);
		let categories = fs.readdirSync('./commands');
		let col = new Discord.Collection();
		let cmdDetail = new Discord.Collection();

		categories.forEach(category => {
			let mod = require(`../${category}/module.json`);

			col[mod.name] = [];
			let commands = fs.readdirSync(`./commands/${category}`);
			commands.forEach(cmd => {
				if (!cmd.endsWith('.js')) return;

				let check = fs.existsSync(`./commands/${category}/${cmd}`);
				
				if (!check) return;
				
				let beta = require(`../${category}/${cmd}`)
				
				if(beta === true) return
				
				let command = new (require(`../${category}/${cmd}`));
				var name = command.name;
				var aliases = command.aliases.map(x => `\`${x}\``);
				var description = command.description;
				var cmdUsage = command.usage;
				var cmdEx = command.example;

				col[mod.name].push(`\`${name}\``);

				if (!command.aliases === aliases) return;
				else if (!command.description === description) return;
				else if (!command.example === cmdEx) return;
				else if (!command.usage === cmdUsage) return;

				let detail = {
					name: name,
					description: description,
					aliases: aliases,
					example: cmdEx,
					usage: cmdUsage
				};
				
				
				command.aliases.forEach(x => {
				  cmdDetail[x] = detail
				})
			});
		});
		if (!args[0]) {
			let em = new Discord.MessageEmbed()
				.setAuthor(this.client.user.tag, this.client.user.displayAvatarURL())
				.setTitle('Kurapika Help')
				.setFooter(
					`Req by: ${message.author.tag}`,
					message.author.displayAvatarURL()
				)
				.setDescription(`Type \`${message.guild.prefix}help [command name]\` for more informations`)
				.setTimestamp()
				.setColor('RANDOM');

			for (let category in col) {
				let names = col[category];

				em.addField(`${category}`, col[category].join(' - '));
			}

			message.util.send(em);
		} else {
		  let i = 1;
			let em = new Discord.MessageEmbed()
				.setThumbnail(this.client.user.displayAvatarURL())
				.setTimestamp()
				.setColor('RANDOM')
				.setFooter(
					"don't includes this <> or this []\n<> = required\n[] = optional"
				);

			for (let cmd in cmdDetail) {
			  let command;
			  command = cmdDetail[args[0]];
			  if(!command) return message.util.send("Not found.")
			  
				let name = command.name;
				let aliases = command.aliases.slice(1);
				let usage = command.usage;
				let ex = command.example;
				let desc = command.description;
				
				if(i > 1) break;
				
				if(!command.name === name) return;
				if(!command.description === desc) return;
				if(!command.usage === usage) return;
				if(!command.example === ex) return;
				if(!command.aliases === aliases) return;
				if(i > 1) break;
				
				em.setTitle(name);
				em.setDescription(desc);
				em.addField('Aliases: ', aliases.join(' - ') || 'No Aliases provided');
				em.addField('Usage: ', usage || 'No Usage provided');
				em.addField('Example: ', ex || 'No Example provided');
				i++
			}
			message.util.send(em);
		}
	}
}

module.exports = HelpCommand;
