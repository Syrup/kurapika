const { Command } = require('discord-akairo');

class PlayCommand extends Command {
	constructor() {
		super('play', {
			aliases: ['play', 'p']
		});

		this.name = "play";
		this.description = "Play a music";
		this.example = "play";
		this.usage = "play <song title|url>";
	}

	async exec(msg) {
	  const args = msg.content
	  .slice(msg.guild.prefix)
	  .trim()
	  .split(/ +/)
	  .slice(1)
	  const { disc } = this.client.util.emojis
	  
	  const util = this.client.util;
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

		if (!music.node || !music.node.connected)
			return msg.channel.send(
				util.embed().setDescription(`❌ | Lavalink node not connected.`)
			);

		const query = args.join(' ');
		try {
			const {
				loadType,
				playlistInfo: { name },
				tracks
			} = await music.load(
				util.isValidURL(query) ? query : `ytsearch:${query}`
			);
			if (!tracks.length)
				return msg.channel.send(
					util.embed().setDescription("❌ | Couldn't find any results.")
				);

			if (loadType === 'PLAYLIST_LOADED') {
				for (const track of tracks) {
					track.requester = msg.author;
					music.queue.push(track);
				}
				msg.channel.send(
					util
						.embed()
						.setDescription(
							`${disc} | Loaded \`${tracks.length}\` tracks from **${name}**.`
						)
				);
			} else {
				const track = tracks[0];
				track.requester = msg.author;
				music.queue.push(track);
				if (music.player && music.player.playing)
					msg.channel.send(
						util
							.embed()
							.setDescription(
								`${disc} | **${track.info.title}** added to the queue.`
							)
					);
			}

			if (!music.player) await music.join(msg.member.voice.channel);
			if (!music.player.playing) await music.start();

			music.setTextCh(msg.channel);
		} catch (e) {
			msg.channel.send(`An error occured: ${e.message}.`);
		}
	}
}

module.exports = PlayCommand;