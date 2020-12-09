const { Structures } = require('discord.js');
const { Collection } = require("discord.js");

Structures.extend('Message', Message => {
	class KurapikaMessage extends Message {
		constructor(...args) {
			super(...args);

			this.say = this.say;
		}
		
		say(msg) {
		  return this.channel.send(msg)
		}
		
		get channels() {
		  let col = new Collection()
		  let r = /<#(\d+)>/gi
		  let channel = r.exec(this.content)
		  
		  if(this.content.includes("<#") && this.content.match(r)) {
		    let id = channel.id
		    
		    col.set(id, channel)
		  }
		}
	}

	return KurapikaMessage;
});