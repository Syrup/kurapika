const { Structures } = require('discord.js');
const config = require("../config.js")

Structures.extend('Guild', Guild => {
    class GuildExt extends Guild {
        constructor(...args) {
            super(...args);
        }

        // Returns the Guild prefix
        // <Guild>.prefix
        get prefix() {
            return this.get('prefix', config.defaultPrefix);
        }

        // The following methods are all namespaced by Guild ID.
        // Examples:
        // <Guild>.get('loggingChannelID', [fallback]);
        // <Guild>.set('loggingChannelID', '383430486506340352')
        get(key, fallback) {
            return this.client.db.get(`${this.id}.${key}`) || fallback;
        }

        set(key, data) {
            return this.client.db.set(`${this.id}.${key}`, data);
        }

        delete(key) {
            return this.client.db.delete(`${this.id}.${key}`);
        }
    }

    return GuildExt;
});
