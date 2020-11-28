# Node Passport Authentication Demo

## Overview
Demo of how to use PassportJS for authentication that was made following [Brad Traversy's tutorial](https://www.youtube.com/watch?v=6FOq4cUdH8k) on *youtube*

## Frameworks / Libraries
- [Express](https://expressjs.com/)
- [Passport](http://www.passportjs.org/)
- [bcryptJS](https://www.npmjs.com/package/bcryptjs) 
- [EJS](https://ejs.co/) / [Express EJS Layouts](https://www.npmjs.com/package/express-ejs-layouts)
- [Mongoose](https://mongoosejs.com/)
- [Connect Flash](https://www.npmjs.com/package/connect-flash) 
- [express-session](https://www.npmjs.com/package/express-session)
- [Bootswatch Journal Theme](https://bootswatch.com/journal/)
- [FontAwesome](https://fontawesome.com/start)

## Setup
### Mongo Atlas
Change `config/keys.template.js` to `config/keys.js` and fill in the URI accordingly. 

### Font Awesome
Change `views/layout-placeholder.ejs` to `views/layout.ejs` and replace the *font awesome CDN link* with your own kit key. *(Font awesome moved to registered CDN keys in version 5)*

Alternatively, you could also run the project without a *font awesome CDN key*, but you'll still need to change the file name. Functionality will remain but a couple icons may not show up. 

## To run:
`npm run dev`