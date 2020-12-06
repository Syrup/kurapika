const { Listener } = require('discord-akairo');

module.exports = class ChannelDeleteListener extends Listener {
    constructor() {
        super('channelDelete', {
            emitter: 'client',
            event: 'channelDelete'
        });
    }

    async exec(channel) {
        this.client.logger.log('info', 
            `The channel ${channel.name} has been deleted in ${channel.guild.name}`
        );
    }
};
