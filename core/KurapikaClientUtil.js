const { ClientUtil } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const prettyMilliseconds = require('pretty-ms');
const axios = require('axios');

class KurapikaClientUtil extends ClientUtil {
	constructor(client) {
		super(client);

		this.getMember = this.getMember;
		this.emojis = require('./emojis.json');
	}

	embed() {
		return new MessageEmbed().setColor('#99AAB5');
	}

	durationToMillis(dur) {
		return (
			dur
				.split(':')
				.map(Number)
				.reduce((acc, curr) => curr + acc * 60) * 1000
		);
	}

	millisToDuration(ms) {
		return prettyMilliseconds(ms, {
			colonNotation: true,
			secondsDecimalDigits: 0
		});
	}

	chunk(arr, size) {
		const temp = [];
		for (let i = 0; i < arr.length; i += size) {
			temp.push(arr.slice(i, i + size));
		}
		return temp;
	}

	isValidURL(url) {
		return /^https?:\/\/((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/i.test(
			url
		);
	}

	shuffleArray(arr) {
		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}
		return arr;
	}

	async webhook(url, msg, opt = {}) {
		let { data: web } = await axios.get(url);

		if (!typeof opt === 'object')
			return Error('That arguments `opt` must be object');

		if (typeof msg === 'object') opt['embeds'] = [msg];
		else opt['content'] = msg;

		return axios.post(url, opt);
	}

	async getMember(message, toFind = '') {
		toFind = toFind.toLowerCase();

		let target = message.guild.members.cache.get(toFind);

		if (!toFind) {
			target = message.member;
		}

		if (!target && message.mentions.members)
			target = message.mentions.members.first();

		if (!target && toFind) {
			target = message.guild.members.cache.find(member => {
				return (
					member.displayName.toLowerCase().includes(toFind) ||
					member.user.tag.toLowerCase().includes(toFind)
				);
			});
		}

		if (!target) {
			return message.channel.send({
				embed: {
					description: 'User Not Found',
					color: 'RED'
				}
			});
		}

		return target;
	}

	getChannel(guild, channel, caseSensitive, wholeWord) {
		let ch = parseInt(channel);

		if (isNaN(ch)) {
			return this.resolveChannel(
				channel,
				guild.channels.cache,
				caseSensitive,
				wholeWord
			);
		} else {
			return guild.channels.cache.get(channel);
		}
	}

	toAbbrev(num) {
		if (!num || isNaN(num)) return '0';
		if (typeof num === 'string') num = parseInt(num);
		let decPlaces = Math.pow(10, 1);
		var abbrev = ['K', 'M', 'B', 'T'];
		for (var i = abbrev.length - 1; i >= 0; i--) {
			var size = Math.pow(10, (i + 1) * 3);
			if (size <= num) {
				num = Math.round((num * decPlaces) / size) / decPlaces;
				if (num == 1000 && i < abbrev.length - 1) {
					num = 1;
					i++;
				}
				num += abbrev[i];
				break;
			}
		}
		return num;
	}
	
	async fetchNSFWSites(force) {
		const { data } = await axios.get('https://raw.githubusercontent.com/blocklistproject/Lists/master/porn.txt');
		let NSFWSites = data.split('\n')
			.filter(site => site && !site.startsWith('#'))
			.map(site => site.replace(/^(0.0.0.0 )/, '')); // eslint-disable-line no-control-regex
		return NSFWSites;
	}
	
}

module.exports = KurapikaClientUtil;