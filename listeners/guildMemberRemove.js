const { Listener } = require('discord-akairo');

module.exports = class GuildMemberRemoveListener extends Listener {
    constructor() {
        super('guildMemberRemove', {
            emitter: 'client',
            event: 'guildMemberRemove'
        });
    }

    async exec(member) {
        this.client.logger.log('info', `${member.user.tag} has been kicked in ${member.guild.name}`
        );
    }
};
