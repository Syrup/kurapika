const { Command } = require('discord-akairo');
const parser = require('command-tags');
const { Rank, Util } = require('canvacord');
const Discord = require('discord.js');
const Levels = require('discord-xp');

class RankCommand extends Command {
	constructor() {
		super('rank', {
			aliases: ['rank', 'level'],
			category: 'Leveling',
			description: {
				content: 'Show your rank in this guild\n**NOTE**\nend the command with --raw if you can\'t load the image',
				usage: 'rank [[@]user] [--canvas]',
				example: [
					'rank',
					'rank @TheUser#1234',
					'rank --raw',
					'rank @TheUser#1234 --raw'
				]
			},
			args: [
				{
					id: 'mention',
					type: 'user',
					default: m => m.author
				}
			]
		});
	}

	async exec(msg, { mention }) {
		const flags = parser(
			{
				string: msg.content,
				prefix: '--'
			},
			'raw'
		);

		const rawLeaderboard = await Levels.fetchLeaderboard(
			msg.guild.id,
			msg.guild.members.cache.size
		);

		const leaderboard = await Levels.computeLeaderboard(
			msg.client,
			rawLeaderboard,
			true
		);

		const user = leaderboard.find(
			x => x.discriminator === mention.discriminator
		);

		/*if(!user) {
		  user = await Levels.fetch(mention.id, msg.guild.id)
		}*/

		let current = user.xp;
		let needed = Levels.xpFor(user.level + 1);

		if (flags.matches[0] === 'raw') {
			msg.util.send(
				require('common-tags').stripIndents`${mention.tag} Rank
				Levels: ${user.level}
				Rank: ${user.position}
				${Util.toAbbrev(current)}/${Util.toAbbrev(needed)} for next rank`,
				{ code: 'apache' }
			);
		} else {
			let image = new Rank()
				.setAvatar(mention.displayAvatarURL({ format: 'png', dynamic: true }))
				.setCurrentXP(current)
				.setRequiredXP(needed)
				.setLevel(user.level)
				.setRank(user.position)
				.setDiscriminator(user.discriminator)
				.setBackground("IMAGE", "https://cdn.mioun.repl.co/bg-rank.png")
				.setUsername(mention.username)
				.setStatus(mention.presence.status, true);

			let data = await image.build();
			let attachment = new Discord.MessageAttachment(
				data,
				mention.username + 'RankCard.png'
			);
			msg.util.send(attachment);
		}
	}
}

module.exports = RankCommand;
