const { ClientUtil } = require('discord-akairo');
const ModClient = require("./client.js");
const axios = require('axios');
class ModUtil extends ClientUtil {
	constructor() {
		super();

		this.client = new ModClient();
	}

	async webhook(url, msg, embed) {
		let { data: web } = await axios.get(url);
		var param;

		param = {
			username: web.name,
			avatar_url: web.avatar,
			content: msg,
			embeds: [embed]
		};

		return axios.post(url, param);
	}
}

module.exports = ModUtil;
