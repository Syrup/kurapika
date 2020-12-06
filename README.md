# hello

# Features

### Send Message as Webhook
```js
this.client.util.webhook(urlWebhook, message, opt)
```

- `urlWebhook` - Your Webhook URL
- `message` - Can be embed or message
- `opt` - type `Object`
#### Example
```js
const { MessageEmbed } = require("discord.js");
let url = "Your Webhook URL
let embed = new MessageEmbed()
.setTitle("Hello")
.setDescription("World")

let opt = {
  username: "Happy",
  avatar_url: message.author.displayAvatarURL(),
  content: "this is optional"
}

this.client.util.webhook(url, embed, opt)
```