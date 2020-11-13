const path = require('path');
const {
	AkairoClient,
	CommandHandler,
	ListenerHandler
} = require('discord-akairo');
const { ownerID, defaultPrefix } = require('../config.js');
const config = require("../config.js");
const db = require('quick.db');
const Utils = require('./utils.js');

require('../structures/Guild.js');
require('../structures/GuildMember.js');

module.exports = class GuardianClient extends AkairoClient {
	constructor() {
		super(
			{
				ownerID
			},
			{
				disableEveryone: true
			}
		);

		this.commandHandler = new CommandHandler(this, {
			directory: path.join(__dirname, '..', 'commands/'),
			handleEdits: true,
			storeMessages: true,
			commandUtil: true,
			prefix: message =>
				message.guild ? message.guild.prefix : defaultPrefix
		});

		this.listenerHandler = new ListenerHandler(this, {
			directory: path.join(__dirname, '..', 'listeners/')
		});
		
		this.config = config
		this.db = db;
		this.Utils = new Utils(this);
	}

	async login(token) {
		this.commandHandler.loadAll();
		this.commandHandler.useListenerHandler(this.listenerHandler);
		this.listenerHandler.loadAll();
		return super.login(token);
	}
};
