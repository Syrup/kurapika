const { Command } = require('discord-akairo');

class LoopCommand extends Command {
	constructor() {
		super('loop', {
			aliases: ['loop', 'lp']
		});

		this.name = 'loop';
		this.description = 'loop the current playing song';
		this.example = 'loop';
		this.usage = 'loop';
	}

	async exec(msg) {
		const args = msg.content
			.slice(msg.guild.prefix)
			.trim()
			.split(/ +/)
			.slice(1);

		const util = this.client.util;
		const { music } = msg.guild;
		if (!music.player)
			return msg.channel.send(
				util.embed().setDescription('❌ | Currently not playing anything.')
			);
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

		music.loop = !music.loop;

		msg.channel.send(
			util
				.embed()
				.setDescription(`✅ | Loop ${music.loop ? 'enabled' : 'disabled'}.`)
		);
	}
}

module.exports = LoopCommand;
