const { Command } = require('discord-akairo');

class PingCommand extends Command {
  constructor() {
    super("ping", {
      aliases: ["ping"]
    })
    this.name = "ping"
    this.description = "pong!"
  }
  
  async exec(message) {
    const m = await message.util.send("pinging..")
    const ping = Math.round(m.createdTimestamp - message.createdTimestamp);
    return message.util.send(`:ping_pong: Pong! \`${this.client.ws.ping}\`ms\n:fire: \`${ping}\`ms`)
  }
}

module.exports = PingCommand;