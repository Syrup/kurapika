const { Command } = require('discord-akairo');

class PingCommand extends Command {
  constructor() {
    super("ping", {
      aliases: ["ping"]
    })
    this.name = "ping"
  }
  
  async exec(message) {
    return message.util.send(`Pong! \`${this.client.ws.ping}\``)
  }
}

module.exports = PingCommand;