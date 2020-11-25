const { Command } = require('discord-akairo');

class BinaryComand extends Command {
	constructor() {
		super('binary', {
			aliases: ['binary', 'bin']
		});
		
		this.name = "binary"
	}

	encode(char) {
		return char
			.split('')
			.map(str => {
				const converted = str.charCodeAt(0).toString(2);
				return converted.padStart(8, '0');
			})
			.join(' ');
	}
	
	decode(char) {
	  return char.split(" ").map(str => String.fromCharCode(Number.parseInt(str, 2))).join("");
	}
	
	exec(message) {
	  let args = message.content.slice(this.client.config.defaultPrefix.length).trim().split(/ +/).slice(1)
	  var binary;
	  
	  let options = ["decode", "encode"]
	  
	  if(!args[0]) return message.util.send(`Type this \`${message.guild.prefix}<binary|bin> <decode|encode> <text>\``) 
	  else if(!options.includes(args[0])) return message.util.send("Invalid option")
	  
	  if(args[0] === "decode") {
	    let char = args.slice(1).join(" ")
	    binary = this.decode(char)
	  } else if(args[0] === "encode") {
	    let char = args.slice(1).join(" ")
	    binary = this.encode(char)
	  }
	  
	  return message.util.send(binary)
	}
	
}

module.exports = BinaryComand;