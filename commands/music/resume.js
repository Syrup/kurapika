const { Command } = require('discord-akairo');

class ResumeCommand extends Command {
	constructor() {
		super('resume', {
			aliases: ['resume', 'res', 'continue']
		});
		
		this.name = "resume";
		this.description = "Resume the current paused song";
		this.example = "resume";
		this.usage = "resumes";
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
			await music.resume();
			msg.react('▶️').catch(e => e);
		} catch (e) {
			msg.channel.send(`An error occured: ${e.message}.`);
		}
	}
}

module.exports = ResumeCommand;