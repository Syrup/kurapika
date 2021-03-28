const { Command } = require('discord-akairo');

class KickCommand extends Command {
	constructor() {
		super('kick', {
			aliases: ['kick'],
			category: 'Moderation',
			description: {
				content: 'kick user',
				usage: 'kick <[@]user> [reason]',
				example: ['kick @someuser#1234 breaking rules']
			},
			args: [
				{
					id: 'user',
					type: 'member',
					prompt: {
						start: msg => `${msg.author}, Who?`
					}
				},
				{
					id: 'reason',
					match: 'content',
					default: 'No Reason'
				}
			]
		});
	}

	exec(message, { user, reason }) {
		if (!message.member.permissions.has('KICK_MEMBERS'))
			return message.util.send(
				"bruh, You don't have permissions `KICK_MEMBERS`"
			);
		if (!message.guild.member(this.client.user).permissions.has('KICK_MEMBERS'))
			return message.util.send(
				"seriously? you don't give me `KICK_MEMBERS` permission"
			);

		const me = message.guild.member(this.client.user);
		reason = reason
			.split(' ')
			.slice(1)
			.join(' ');

		if (user.id === me.id) return message.util.send('Why you want to kick me?');

		if (me.roles.highest.position <= user.roles.highest.position) {
			return message.util.send(
				"I can't kick it maybe because the role is higher than mine"
			);
		}

		try {
			user.kick(reason).then(() => {
				message.util.send('Successfully kicked ' + user.user.tag + "\nReason: " + reason);
			});
		} catch (e) {
			message.channel.send(`Cannot kick this user, Because: \`${e.message}\``);
		}
	}
}

module.exports = KickCommand;
