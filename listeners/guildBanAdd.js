const { Listener } = require('discord-akairo');

module.exports = class GuildBanAddListener extends Listener {
    constructor() {
        super('guildBanAdd', {
            emitter: 'client',
            event: 'guildBanAdd'
        });
    }

    async exec(guild, user) {
        this.client.logger.log('info', `${user.tag} has been banned in ${guild.name}`);
    }
};
