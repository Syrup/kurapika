const { Listener } = require('discord-akairo');

module.exports = class ReadyListener extends Listener {
	constructor() {
		super('ready', {
			emitter: 'client',
			event: 'ready'
		});
	}

	async exec() {
		this.client.logger.log('info', `${this.client.user.tag} is now ready!`);
		const nodes = [...this.client.manager.nodes.values()];
		for (const node of nodes) {
			try {
				await node.connect();
			} catch (e) {
				this.client.manager.emit('error', e, node);
			}
		this.client.util.webhook(this.client.config.statusWebhook, "I'm online :)", { avatar_url: this.client.user.displayAvatarURL({ format: "png" }), username: this.client.user.username })
		}
	}
};
