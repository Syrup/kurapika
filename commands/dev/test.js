const { Command } = require('discord-akairo');
const Levels = require('discord-xp');
let index = 0;

class TestCommand extends Command {
	constructor() {
		super('test', {
			aliases: ['test'],
			ownerOnly: true
		});
	}

	async exec(msg) {
		function awaitReactions(m) {
			const filter = (rect, usr) =>
				react.includes(rect.emoji.name) && usr.id === msg.author.id;
			m.createReactionCollector(filter, { time: 30000, max: 1 }).on(
				'collect',
				col => {
					const emo = col.emoji.name;
					if (emo === react[0]) index--;
					if (emo === react[1]) index++;
					index = ((index % chunks.length) + chunks.length) % chunks.length;
					em.setDescription(chunks[index].join('\n'));
					em.setFooter(`Page ${index + 1} of ${chunks.length}`);
					m.edit(em);
					return awaitReactions(m);
				}
			);
		}

		const react = ['◀', '▶'];
		const limit = msg.guild.members.cache.size;

		const rawLeaderboard = await Levels.fetchLeaderboard(msg.guild.id, limit);
		const leaderboard = await Levels.computeLeaderboard(
			msg.client,
			rawLeaderboard,
			true
		);
		const lb = leaderboard.map(
			l =>
				`**${l.position}. ${l.username}#${l.discriminator}**\nLevels: ${
					l.level
				}\nEXP: ${this.client.util.toAbbrev(l.xp)}/${this.client.util.toAbbrev(
					Levels.xpFor(l.level + 1)
				)}\nuserID: ${l.userID}\n`
		);
		const chunks = this.client.util.chunk(lb, 10);

		// chunks.pop();

		const em = this.client.util
			.embed()
			.setTitle(`${msg.guild.name} Leaderboards`)
			.setThumbnail(msg.guild.iconURL({ size: 2048, dynamic: true }))
			.setDescription(chunks[index].join('\n'))
			.setFooter(`Page ${index + 1} of ${chunks.length}`);

		const m = await msg.say(em);

		for (let r of react) {
			await m.react(r);
		}

		return awaitReactions(m);
	}
}

module.exports = TestCommand;
