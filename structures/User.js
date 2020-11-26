const { Structures } = require("discord.js")

Structures.extend("User", User => {
  class KurapikaUser extends User {
    constructor(...args) {
      super(...args)
    }
    
    
    
  }
  return KurapikaUser
})