# ❗ARCHIVE
will create a new repository for the slash command.
Done: https://github.com/Syrup/kurapika-update2/

---




# Kurapika
[![Discord Bots](https://top.gg/api/widget/status/707651800072716360.svg)](https://top.gg/bot/707651800072716360)
[![Discord Bots](https://top.gg/api/widget/upvotes/707651800072716360.svg)](https://top.gg/bot/707651800072716360)

### Note
> Don't forget to do `npm install --save` before running the bot!!!!

# Navigation
---
- [Kurapika](#kurapika)
    - [Tutorial](#tutorial)
        - [Environment setup](#environment-setup)
        - [Bot configuration](#bot-configuration)
    - [Features](#features)
        - [Send Message As Webhook](#send-message-as-webhook)
          - [Example](#example)
        - [getMember](#getmember)
          - [Example](#example-1)
        - [getChannel](#getchannel)
          - [Example](#example-2)


# Tutorial
###### Environment Setup
rename `.env-example` to `.env`
now open `.env` file and fill in each variable according to the instructional


###### Bot Configuration
open `config.js` file
now replace `YOUR DISCORD ID, YOUR DISCORD ID 2` with your discord id and replace `YOUR DISCORD ID 2` your friend discord id
and replace `prefix` with your discord prefix

###### Run Bot
Run the bot with bash command `npm start` or `node index.js`



### And Done 🖐️

# Features

### Send Message as Webhook
```js
this.client.util.webhook(urlWebhook, message, opt)
```

| Name       | Type                                                                                              | Default | Description             | Required |
|------------|---------------------------------------------------------------------------------------------------|---------|-------------------------|----------|
| urlWebhook | **String**                                                                                        | `none`  | Your webhook URL        | `true`   |
| message    | [MessageEmbed](https://discord.js.org/#/docs/main/stable/class/MessageEmbed) or **String**        | `none`  | Can be embed or message | `true`   |
| opt        | [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) | `none`  | Options                 | `false`  |


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

| Name    | Type                                                               | Default | Description      | Required |
|---------|--------------------------------------------------------------------|---------|------------------|----------|
| message | [Message](https://discord.js.org/#/docs/main/stable/class/Message) | `none`  | message          | `true`   |
| name    | Snowflake or Username                                              | `none`  | maybe id or name | `true`   |


#### Example
```js
(async () => {
  let member = await this.client.util.getMember(message, "Syrup")
  return member
})()
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

### getChannel
```js
this.client.util.getChannel(guild, channel, caseSensitive, wholeWord)
```

#### Example
```js
this.client.util.getChannel(message.guild, "general", true)
```

| Name          | Type                                                                                                | Default | Description                                 | Required |
|---------------|-----------------------------------------------------------------------------------------------------|---------|---------------------------------------------|----------|
| guild         | [Guild](https://discord.js.org/#/docs/main/stable/class/Guild)                                      | `none`  | Guild to check                              | `true`   |
| channel       | Snowflake or Channel Name                                                                           | `none`  | maybe the channel id or name               | `true`   |
| caseSensitive | [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | `false` | Makes checking by name case sensitive.      | `false`  |
| wholeWord     | [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | `false` | Makes finding by name match full word only. | `false`  |

> This maybe the same as [resolveChannel](https://discord-akairo.github.io/#/docs/main/master/class/ClientUtil?scrollTo=resolveChannel) but I have kept it simple :)

return [Channel](https://discord.js.org/#/docs/main/stable/class/Channel)

---
[![Discord Bots](https://top.gg/api/widget/707651800072716360.svg)](https://top.gg/bot/707651800072716360)
