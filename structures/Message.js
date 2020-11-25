const { Structures } = require('discord.js');

Structures.extend('Message', Message => {
	class KurapikaMessage extends Message {
		constructor(...args) {
			super(...args);
		}
		get test() {
		  return "b";
		}
	}

	return KurapikaMessage;
});
