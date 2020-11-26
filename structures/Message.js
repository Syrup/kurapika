const { Structures } = require('discord.js');

Structures.extend('Message', Message => {
	class KurapikaMessage extends Message {
		constructor(...args) {
			super(...args);

			this.say = this.say
		}
		
		say(msg) {
		  return this.channel.send(msg)
		}
	}

	return KurapikaMessage;
});