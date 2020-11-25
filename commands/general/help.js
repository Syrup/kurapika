const { Command } = require('discord-akairo');
const Discord = require('discord.js');
const fs = require('fs');

class HelpCommand extends Command {
	constructor() {
		super('help', {
			aliases: ['help', 'h', '?']
		});
		this.name = 'help';
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
				var aliases = command.aliases;
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

				cmdDetail[name] = detail;
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
					"don't includes this <> or this [], if you see this <> = required, if you see this [] = optional"
				);

			for (let cmd in cmdDetail) {
				i = i++;
				let command = cmdDetail[args[0]];
				let name = command.name;
				let aliases = command.aliases;
				let usage = command.usage;
				let ex = command.example;
				let desc = command.description;
				
				
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
				em.addField('Example: ', usage || 'No Example provided');
			}
			console.log(cmdDetail)
			message.util.send(em);
		}
		console.log(cmdDetail)
	}
}

module.exports = HelpCommand;
