const { Command } = require("discord-akairo");
const Discord = require("discord.js");

class BalanceCommand extends Command {
  constructor() {
    super("balance", {
      aliases: ["balance", "bal"]
    })
    
    this.name = "balance"
    this.description = "check your balance or your friend balance"
    this.usage = "balance [@user]"
    this.example = "balance"
  }
  
  exec(msg) {
    let user = msg.mentions.users.first()
    let you = msg.member
    
    let em = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setFooter(`Req by: ${msg.author.tag}`)
    .setTimestamp()
    
    if(!user) {
      em
      .addFields(
        {
          name: "Money",
          value: you.economy.money.toLocaleString(),
          inline: true
        },
        {
          name: "Bank",
          value: you.economy.bank.toLocaleString(),
          inline: true
        }
      )
      .setTitle(`${you.economy.user.tag} Balance`)
    } else {
      user = msg.guild.member(user)
      em
      .addFields(
        {
          name: "Money",
          value: user.economy.money.toLocaleString(),
          inline: true
        },
        {
          name: "Bank",
          value: user.economy.bank.toLocaleString(),
          inline: true
        }
      )
      .setTitle(`${user.economy.user.tag} Balance`)
    }
    
    msg.util.send(em)
  }
  
}

module.exports = BalanceCommand;