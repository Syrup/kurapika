const { Command } = require('discord-akairo');

class RemoveCommand extends Command {
	constructor() {
		super('remove', {
			aliases: ['remove', 'rm'],
			category: 'Music',
			description: {
				content: 'Remove music from queue',
				usage: 'remove <number>',
				example: ['remove 1', 'remove 40']
			},
			args: [
				{
					id: 'index',
					type: 'number',
					prompt: {
						start: 'Index?'
					}
				}
			]
		});
	}

	exec(msg, { index }) {
		const number = parseInt(index);
		const { music } = msg.guild;
		if (!msg.member.voice.channel)
			return msg.channel.send(
				util.embed().setDescription('❌ | You must be on a voice channel.')
			);
		if (
			msg.guild.me.voice.channel &&
			!msg.guild.me.voice.channel.equals(msg.member.voice.channel)
		)
			return msg.channel.send(
				util
					.embed()
					.setDescription(
						`❌ | You must be on ${
							msg.guild.me.voice.channel
						} to use this command.`
					)
			);

		if (!music.player || !music.player.playing)
			return msg.channel.send(
				util.embed().setDescription('❌ | Currently not playing anything.')
			);
		if (!music.queue.length)
			return msg.channel.send(
				util.embed().setDescription('❌ | Queue is empty.')
			);
			
		const { queue: q } = music;
		
		const em = this.client.util.embed()
		.setDescription(`Removed [${q[number - 1].info.title}](${q[number - 1].info.uri})`)
		
		q.splice(q.indexOf(q[number - 1]), 1)
		
		msg.say(em)
		
	}
}

module.exports = RemoveCommand