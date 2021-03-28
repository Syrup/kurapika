const path = require('path');
const {
	AkairoClient,
	CommandHandler,
	ListenerHandler
} = require('discord-akairo');
const fs = require('fs');
let config = require('js-yaml').load(fs.readFileSync('yaml/config.yml'));
let { ownerID, prefix } = config;
const { Manager } = require('@lavacord/discord.js');
const KurapikaClientUtil = require('./KurapikaClientUtil.js');
const db = require('quick.db');
const winston = require('winston');

const dir = fs.readdirSync('structures');

for (let f of dir) {
	if (!f.endsWith('.js')) return;
	require(`../structures/${f}`);
}

module.exports = class KurapikaClient extends AkairoClient {
	constructor(...args) {
		super(...args);

		this.logger = winston.createLogger({
			transports: [
				new winston.transports.Console(),
				new winston.transports.File({ filename: 'log' })
			],
			format: winston.format.printf(log => {
				return `[${log.level.toUpperCase()}] ${log.message}`;
			})
		});
		
		this.sourcebin = require("sourcebin-api");
		
		this.manager = new Manager(this, [
			{
				id: 'main',
				host: process.env.LAVA_HOST,
				port: process.env.LAVA_PORT,
				password: process.env.LAVA_PASS
			}
		]);

		this.commandHandler = new CommandHandler(this, {
			directory: path.join(__dirname, '..', 'commands/'),
			handleEdits: true,
			storeMessages: true,
			commandUtil: true,
			prefix: message => (message.guild ? message.guild.prefix : config.prefix),
			allowMention: true,
			fetchMembers: true,
			commandUtil: true,
			commandUtilSweepInterval: 9e5,
			handleEdits: true,
			defaultCooldown: 5e3,
			argumentDefaults: {
			  prompt: {
			    limit: 4,
			    modifyStart: (msg, str) => `${msg.author}, ${str}\n\n I'm waiting for you in 30 seconds`,
			    modifyRetry: (msg, _, d) => `${msg.author}, Invalid Argument. Try again, You have ${d.retries} more chances`,
			    modifyEnded: (msg, _, d) => `${msg.author}, You entered the wrong argument ${d.retries} times, so the command was canceled`,
			    modifyTimeout: (msg, _) => `${msg.author}, Timeout`
			  }
			}
		});

		this.listenerHandler = new ListenerHandler(this, {
			directory: path.join(__dirname, '..', 'listeners/')
		});

		this.util = new KurapikaClientUtil(this);
		this.config = config;
		this.db = db;
		this.fetch = require('node-fetch');
	}

	async login(token) {
		this.commandHandler.loadAll();
		this.commandHandler.useListenerHandler(this.listenerHandler);
		this.listenerHandler.loadAll();

		this.manager
			.on('ready', node => console.log(`Node ${node.id} is ready!`))
			.on('disconnect', (ws, node) =>
				console.log(`Node ${node.id} disconnected.`)
			)
			.on('reconnecting', node =>
				console.log(`Node ${node.id} tries to reconnect.`)
			)
			.on('error', (error, node) =>
				console.log(`Node ${node.id} got an error: ${error.message}`)
			);

		return super.login(token);
	}
};
