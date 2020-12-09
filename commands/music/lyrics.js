const { Command } = require("discord-akairo");
const Genius = require("genius-lyrics");
const genius = new Genius.Client();
const Discord = require("discord.js");
const { Menu } = require("discord.js-menu");

class LyricsCommand extends Command {
  constructor() {
    super("lyrics", {
      aliases: ["lyrics", "lyric", "ly"]
    })
    
    this.name = "lyrics";
    this.description = "Search Lyrics\nPowered by **Genius.com**";
    this.example = "lyrics faded";
    this.usage = "lyrics <song name>";
  }
  
  async exec(msg) {
    const args = msg.content
    .slice(msg.guild.prefix)
    .trim()
    .split(/ +/)
    .slice(1)
    
    let results = await genius.songs.search(args.join(" "));
    let res = results[0];
    let lyrics = await res.lyrics();
    let title = res.title;
    let url = res.url
    let thumbnail = res.thumbnail;
    let artist = res.artist;
    let artistName = artist.name;
    let artistURL = artist.url;
    let artistID = artist.id;
    let lyrics2 = lyrics.slice(2048, lyrics.length)
    
    let ly = new Menu(msg.channel, msg.author.id, [
      {
        name: "1",
        content: new Discord.MessageEmbed()
        .setTitle(title)
        .setURL(url)
        .setThumbnail(thumbnail)
        .setDescription(`[${artistName}](${artistURL}) (${artistID})\n${lyrics.slice(0, 2040)}`)
        .setFooter(`Req by: ${msg.author.tag} | ${artistName}`)
        .setTimestamp()
        .setColor("RANDOM"),
        reactions: {
          "▶️": "2"
        }
      },
      {
        name: "2",
        content: new Discord.MessageEmbed()
        .setTitle(title)
        .setURL(url)
        .setThumbnail(thumbnail)
        .setDescription(`[${artistName}](${artistURL}) (${artistID})\n${lyrics.slice(2048, lyrics.length)}`)
        .setFooter(`Req by: ${msg.author.tag} | ${artistName}`)
        .setTimestamp()
        .setColor("RANDOM"),
        reactions: {
          "◀️": "1"
        }
      }
      ])
      
      ly.start()
  }
  
  
}

module.exports = LyricsCommand;