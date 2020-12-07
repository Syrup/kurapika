# hello

# Features

### Send Message as Webhook
```js
this.client.util.webhook(urlWebhook, message, opt)
```

- `urlWebhook` - Your Webhook URL
- `message` - Can be embed or message
- `opt` - type [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)


#### Example
```js
const { MessageEmbed } = require("discord.js");
let url = "Your Webhook URL"
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

return [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

### getMember
```js
this.client.util.getMember(message, name)
```

- message - `Message`
- name - `User Name`


#### Example
```js
(async () => {
  let member = await this.client.util.getMember(message, "Syrup")
  return member
})
```

or

```js
async function user(message, name) {
  const member = await this.client.util.getMember(message, name)
  return member
}

user(message, "Kurapika")
```

return [GuildMember](https://discord.js.org/#/docs/main/stable/class/GuildMember)
