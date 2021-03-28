const { Structures } = require("discord.js")

Structures.extend("User", User => {
  class KurapikaUser extends User {
    constructor(...args) {
      super(...args)
      this.owner = this.client.isOwner(this)
    }
    
  }
  return KurapikaUser
})