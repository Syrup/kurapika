const { Structures, Collection } = require('discord.js');

Structures.extend('Message', Message => {
	class KurapikaMessage extends Message {
		constructor(...args) {
			super(...args);

			this.say = this.say;
		}
		
		say(...content) {
		  return this.channel.send(...content)
		}
	}

	return KurapikaMessage;
});