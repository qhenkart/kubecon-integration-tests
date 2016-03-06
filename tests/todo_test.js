
module.exports = {
  options : {
    url : process.env.URL || 'localhost:3000',
    pause: process.env.PAUSE || 0
  },

  before : function(browser){
    browser
    .url(this.options.url)
  },
  'logs in to the app': function (browser){
    var pause = this.options.pause
    browser  
    .waitForElementVisible('input.username', pause + 2000)
    .setValue('input.username', 'user')
    .setValue('input.password', 'pass')
    .keys(browser.Keys.RETURN)
  },
  'adds todo messages' : function (browser) {
    var pause = this.options.pause
    browser  
    .waitForElementVisible('input.new-todo', pause + 1000)
    .setValue('input.new-todo', 'I\'m a todo', function(){
      browser
      .keys(browser.Keys.RETURN)
    })
    .pause(pause + 500)
    .verify.elementPresent('.view', 'a todo should appear')
    .getText('.view', function(text) {
      this.verify.equal(text.value, 'I\'m a todo')
    })
  },
  'completes a todo': function(browser){
    var pause = this.options.pause
    browser
    .pause(pause + 500)
    .click('.view', function(){
      this.verify.elementPresent('.completed', 'a todo item should be completed')
    })
    .pause(pause + 500)
    .click('.view', function(){
      this.verify.elementNotPresent('.completed', 'a todo item should be toggled back to not completed')
    })
    .end()
  }
}