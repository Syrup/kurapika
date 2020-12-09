const { Command } = require('discord-akairo');

class PauseCommand extends Command {
	constructor() {
		super('pause', {
			aliases: ['pause', 'ps']
		});
		
		this.name = "pause";
		this.description = "Pause the music";
		this.example = "pause";
		this.usage = "pause";
	}

	async exec(msg) {
	  const util = this.client.util;
		const { music } = msg.guild;
		if (!music.player || !music.player.playing)
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

		try {
			await music.pause();
			msg.react('⏸️').catch(e => e);
		} catch (e) {
			msg.channel.send(`An error occured: ${e.message}.`);
		}
	}
}

module.exports = PauseCommand;