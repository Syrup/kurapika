const { Structures } = require("discord-akairo");

Structures.extend("Message", Message => {
  class MessageExt extends Message {
    constructor(...args) {
      super(...args)
    }
    
    get say(args) {
      return this.util.send(args)
    }
  }
  
  return MessageExt;
})