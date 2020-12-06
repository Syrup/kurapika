const { Command }= require('discord-akairo');
const Discord = require('discord.js');

class DepositCommand extends Command {
  constructor() {
    super("deposit", {
      aliases: ['deposit', 'depo'],
      cooldown: 3000
    })

    this.name = "deposit"
    this.decription = "Save your money in bank"
    this.usage = "deposit <amount>"
    this.example = "deposit 1000"
  }

  exec(msg) {
    let args = msg.content.slice(msg.guild.prefix).trim().split(/ +/).slice(1)
    let amount = args[0]

    if(msg.member.economy.money < amount) return msg.util.send("You dont have "+ amount + " money in your account")
    else if(msg.member.economy.money < 0) return msg.util.send("You have 0 money in your account")

    msg.member.removeMoney(amount)
    msg.member.setBank(amount)
    let em = new Discord.MessageEmbed()
    .setTitle(msg.author.tag)
    .setDescription(`Saving your **${amount}** money in Bank\nNow you have ${msg.member.economy.money} money in your account`)
    .setTimestamp()
    .setFooter("Req by: "+msg.author.tag, msg.author.displayAvatarURL())

    msg.util.send(em)

  }

}

module.exports = DepositCommand;