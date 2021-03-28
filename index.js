const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./bot.js', { token: process.env.TOKEN, totalShards: "auto"});

manager.on('shardCreate', shard => console.log(`[${new Date().toString().split(" ", 5).join(" ").slice(16)}] Launched shard #${shard.id}`));
manager.spawn(manager.totalShards, 10000);