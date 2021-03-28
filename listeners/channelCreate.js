const { Listener } = require('discord-akairo');

module.exports = class ChannelCreateListener extends Listener {
    constructor() {
        super('channelCreate', {
            emitter: 'client',
            event: 'channelCreate'
        });
    }

    async exec(channel) {
        this.client.logger.log("info", 
            `The channel ${channel.name} has been created in ${channel.guild.name}`
        );
    }
};
