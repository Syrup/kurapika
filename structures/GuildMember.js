const { Structures } = require('discord.js');
const moment = require('moment');

Structures.extend('GuildMember', GuildMember => {
	class GuildMemberExt extends GuildMember {
		constructor(...args) {
			super(...args);
		}

		get afk() {
		  let afk = {
		    reason: this.getAfk(),
		    user: this.user
		  }
			return afk;
		}

		getAfk() {
			return this.client.db.get(`afk.${this.guild.id}.${this.id}`);
		}

		setAfk(reason) {
			if (!reason) return TypeError('No Reason provided');

			this.client.db.set(`afk.${this.guild.id}.${this.id}`, reason);
		}

		setAfkDate() {
			let date = new Date();
			date = moment.utc(date).format('DD - MM - YYYY | hh:mm:ss A');

			this.client.db.set(`afk.${this.guild.id}.${this.id}.date`, date);
		}

		getAfkDate() {
			this.client.db.get(`afk.${this.guild.id}.${this.id}.date`);
		}

		deleteAfk() {
			this.client.db.delete(`afk.${this.guild.id}.date`);

			this.client.db.delete(`afk.${this.guild.id}.${this.id}`);
		}
		
		get economy() {
		  let economy = {
		    money: this.client.db.get(`economy.${this.guild.id}.${this.id}.money`) || 0,
		    bank: this.client.db.get(`economy.${this.guild.id}.${this.id}.bank`) || 0,
		    cooldown: this.client.db.get(`economy.${this.guild.id}.${this.id}.cooldown`),
		    user: this.user
		  }
		  return economy;
		}
		
		setMoney(amount) {
		  return this.client.db.add(`economy.${this.guild.id}.${this.id}.money`, amount)
		}
		
		setBank(amount) {
		  return this.client.db.add(`economy.${this.guild.id}.${this.id}.bank`, amount)
		}

		removeMoney(amount) {
		  return this.client.db.subtract(`economy.${this.guild.id}.${this.id}.money`, amount)
		}
		
		removeBank(amount) {
		  return this.client.db.subtract(`economy.${this.guild.id}.${this.id}.bank`, amount)
		}

		
	}

	return GuildMemberExt;
});
