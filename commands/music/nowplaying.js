const { Command } = require('discord-akairo');

class NowPlayingCommand extends Command {
	constructor() {
		super('nowplaying', {
			aliases: ['nowplaying', 'np']
		});

		this.name = 'nowplaying';
		this.description = 'Show the current playing song';
		this.example = 'nowplaying';
		this.usage = 'nowplaying';
	}

	async exec(msg) {
		const args = msg.content
			.slice(msg.guild.prefix)
			.trim()
			.split(/ +/)
			.slice(1);

		const util = this.client.util;
		const { music } = msg.guild;
		if (!music.player || !music.player.playing)
			return msg.channel.send(
				util.embed().setDescription('❌ | Currently not playing anything.')
			);
		msg.channel.send(
			util
				.embed()
				.setDescription(`🎶 | Now playing **${music.current.info.title}**.`)
		);
	}
}

module.exports = NowPlayingCommand;
