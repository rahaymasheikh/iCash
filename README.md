# iCash

## Overview
Most people don’t carry much cash around anymore. 
And if they do, a lot of people don’t keep track of it (especially all that loose change at the bottom of your bag). 
More often than not, people expect they have more cash on them than they actually do (I know I do), which can be especially problematic when you realize the place you just ordered food at only takes cash… and you don’t have enough. 
This is where iCash comes in! iCash is a web application that will allow a user to keep track of how much cash they are currently carrying around at any given moment without having to worry about manually counting it to keep track of it. 
Users will be able to log in and create a personal account to keep track of their money. After logging in, they can set their current balance to a starting number. 
Thereafter, the user can add or subtract amounts they just received or spent. It will also show when the current balance amount was last updated.


## Data Model 
This application will store Users and Amounts.

Example User Data:
    
    {
        username: “rahaymaCash”,
        hash: // password hash
     }
   


Example Amount Data:

    {
        user: // reference to User object,
        money: 0.00 //default value,
        lastUpdated: // date 
    }
   

## Link to First Draft Schema
[Schema](https://github.com/nyu-csci-ua-0480-001-003-fall-2018/rahaymasheikh-final-project/blob/master/db.js)

## Wireframes
/ - homepage 
![Screenshot](https://github.com/nyu-csci-ua-0480-001-003-fall-2018/rahaymasheikh-final-project/blob/master/documentation/:.jpg.jpg)

/login - log in page 
![Screenshot](https://github.com/nyu-csci-ua-0480-001-003-fall-2018/rahaymasheikh-final-project/blob/master/documentation/:login.jpg)

/createAccount - page to create a new user account 
![Screenshot](https://github.com/nyu-csci-ua-0480-001-003-fall-2018/rahaymasheikh-final-project/blob/master/documentation/:createAccount.jpg)

/account/myCash - page to display current balance with the option to add or subtract amounts
![Screenshot](https://github.com/nyu-csci-ua-0480-001-003-fall-2018/rahaymasheikh-final-project/blob/master/documentation/:account:myCash.jpg)

/account/myCash/add - page for adding an amount to the current balance
![Screenshot](https://github.com/nyu-csci-ua-0480-001-003-fall-2018/rahaymasheikh-final-project/blob/master/documentation/:account:myCash:add.jpg)

/account/myCash/sub - page for subtracting an amount from the current balance
![Screenshot](https://github.com/nyu-csci-ua-0480-001-003-fall-2018/rahaymasheikh-final-project/blob/master/documentation/:account:myCash:sub.jpg)

## Site Map
![Screenshot](https://github.com/nyu-csci-ua-0480-001-003-fall-2018/rahaymasheikh-final-project/blob/master/documentation/sitemap.png)

## User Stories
1. As a user, I can create an account for the site 
2. As a user, I can log in to the site
3. As a user, I can set a starting value to my current balance 
4. As a user, I can update that current balance by adding some dollar and cent amount
5. As a user, I can update that current balance by subtracting some dollar and cent amount 

## Research Topics
- Bootstrap (2 points) 
    - Is a front end framework that will allow a nice feature for designing the web app using html and css. It provides nice clean
    themes that can be configured with fair ease. There are several free themes available for configuration. This is worth 2 points. 
- Integrate user authentication using passport (5 points)
    - Passport is middleware designed for authentication for Node. It is supposed to make the process of authentication easier for developers. 
    Developers can pick which strategies their application can apply for authentication via passport. This is worth 5 points according to the sample documentation provided.  
- Utilize the JavaScript library 'Anime' (2 points)
    - Anime is a JavaScript library that allows to code for animations that can add more dynamic visuals to the user interface. 
    It can work with all CSS properties, as well as JavaScript Objects. It seems like a fairly simple library to use once you get the hang of how to use it. 
    It is worth 2 points because it will be used sparingly in the project, but requires some work to become familiar with the syntax to make things function how you want them to.
    
## Link to Main Project File
[App](https://github.com/nyu-csci-ua-0480-001-003-fall-2018/rahaymasheikh-final-project/blob/master/app.js)

## Annotations / References
[passport.js documentation for authentication](http://www.passportjs.org/docs/)

[Anime.js documentation for animation](http://animejs.com/documentation/)
