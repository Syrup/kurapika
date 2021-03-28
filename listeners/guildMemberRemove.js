const { Listener } = require('discord-akairo');
const Levels = require("discord-xp");

module.exports = class GuildMemberRemoveListener extends Listener {
    constructor() {
        super('guildMemberRemove', {
            emitter: 'client',
            event: 'guildMemberRemove'
        });
    }

    async exec(member) {
        this.client.logger.log('info', `${member.user.tag} has left in ${member.guild.name}`
        );
        
        await Levels.deleteUser(member.user.id, member.guild.id);
    }
};
