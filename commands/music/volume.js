const { Command } = require('discord-akairo');

class VolumeCommand extends Command {
	constructor() {
		super('volume', {
			aliases: ['volume', 'vol']
		});
		
		this.name = "volume";
		this.description = "Set the volume\nMax 200";
		this.example = "volume 70";
		this.usage = "volume <amount>";
	}

	async exec(msg) {
	  const args = msg.content
	  .slice(msg.guild.prefix)
	  .trim()
	  .split(/ +/)
	  .slice(1)
	  
	  const util = this.client.util;
	  const { music } = msg.guild;
	  const newVolume = args[0];
	  if (!music.player || !music.player.playing) return msg.channel.send(util.embed().setDescription("❌ | Currently not playing anything."));
	  try {
	    if (!newVolume || isNaN(newVolume)) {
	      msg.channel.send(util.embed().setDescription(`🔉 | Current volume \`${music.volume}\`.`));
	    } else {
	      if (!msg.member.voice.channel)
	      return msg.channel.send(util.embed().setDescription("❌ | You must be on a voice channel."));
	      if (msg.guild.me.voice.channel && !msg.guild.me.voice.channel.equals(msg.member.voice.channel))
	      return msg.channel.send(util.embed().setDescription(`❌ | You must be on ${msg.guild.me.voice.channel} to use this command.`));
	      
	      await music.setVolume(newVolume);
	      msg.channel.send(util.embed().setDescription(`🔉 | Volume set to \`${music.volume}\`.`));
	    }
	  } catch (e) {
	    msg.channel.send(`An error occured: ${e.message}.`);
	  }
	}
}

module.exports = VolumeCommand;