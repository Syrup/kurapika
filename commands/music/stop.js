const { Command } = require('discord-akairo');

class StopCommand extends Command {
	constructor() {
		super('stop', {
			aliases: ['stop', "sp"]
		});
		
	  this.name = "stop";
		this.description = "Stop the current playing song";
		this.example = "stop";
		this.usage = "stop";
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
			await music.stop();
			msg.react('⏹️').catch(e => e);
		} catch (e) {
			msg.channel.send(`An error occured: ${e.message}.`);
		}
	}
}

module.exports = StopCommand;