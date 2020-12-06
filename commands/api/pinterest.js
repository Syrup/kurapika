const Discord = require('discord.js');
const { Command } = require('discord-akairo');
const axios = require('axios');

class PinterestCommand extends Command {
	constructor() {
		super('pinterest', {
			aliases: ['pinterest', 'pin', 'pint']
		});
		
		this.name = "pinterest"
		this.description = "search pinterest image"
		this.usage = "pinterest <name>"
		this.example = "pinterest minecraft"
	}
	
	async getImage(key) {/*
	  const { data: res } = await axios.get(
			'http://api.fdci.se/sosmed/rep.php?gambar=' + key
		);
		
		let i = Math.floor(Math.random() * res.length);

		if (!res[i]) i = i+1;
		
		console.log(res)
		
		return res[i];
	*/}
	
	async exec(message) {
		
	  
	  let args = message.content
			.slice(this.client.config.defaultPrefix.length)
			.trim()
			.split(/ +/)
			.slice(1);
	  
	  let key = encodeURIComponent(args.join(' '));
		if (!key) return message.util.send('Give me Arguments to search');
		
		const { data: res } = await axios.get(
			'http://api.fdci.se/sosmed/rep.php?gambar=' + key
		);
		
		let i = Math.floor(Math.random() * res.length);

		if (!res[i]) i = i+1;
		
		key = decodeURIComponent(key)

		let em = new Discord.MessageEmbed()
			.setAuthor(
				key,
				'https://assets.stickpng.com/images/580b57fcd9996e24bc43c52e.png'
			)
			.setImage(res[i])
			.setFooter("Powered By: FDCI Cyber Security - fdcicyber.org/pinterest-search-image")
			.setTimestamp()
			.setColor("RANDOM")

		 message.util.send(em);
	}
}
	

module.exports = PinterestCommand;
