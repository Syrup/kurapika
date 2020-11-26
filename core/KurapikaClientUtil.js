const { ClientUtil } = require('discord-akairo');
const axios = require('axios');
class KurapikaClientUtil extends ClientUtil {
	constructor(client) {
		super();

		this.client = client;
	}

	async webhook(url, msg, embed) {
		let { data: web } = await axios.get(url);
		var param;

		param = {
			username: web.name,
			avatar_url: web.avatar,
			content: msg,
		};
		
		if(embed) param.embeds = [embed]

		return axios.post(url, param);
	}
}

module.exports = KurapikaClientUtil;