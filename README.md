## Roccoco de l'eau
---
## A little background: 'Salon' means living room.  Salon-style is a way to display art, referring to the secular style primarily used for interiors of private residences.  Roccoco, sometimes known as late-baroque, began in the 1730's as a reaction against formal and all too geometric display.  Rocaille was a method of decoration that was used with cememnt and seashells to decorate fountains and grottos, thus the term "Roccoco style".  Art would be displayed in a random fashion on a wall to accentuate it's authenticity.  

## This app generates a wall of art based upon terms fed into it.  There are so many possibilities, as its API is the Metropolitan museum in New York City and the API hosts 43,000+ artworks to sort. Please enjoy Roccoco de l'eau, a tribute to the place where handheld devices are used when free time is actually available.

## Visit the App
1. In your terminal, clone this repository by running ```git clone https://github.com/percworld/Rococo.git```
2. Run the command ```serve -s build```
3. In your browser navigate to http://localhost:5000/

## Home screen
![Home screen](https://user-images.githubusercontent.com/71858456/115323832-06df1d00-a146-11eb-9028-f690d87c6675.png)
1. This collection of art from the Met is populated by three terms already in storage. 
2. As a user, you have a favorites area you may visit with the button on the top right.  
3. At any point, you may revisit the home screen by clicking on the logo on the top left.  Click it a few times as you enjoy the tour of this particular floor until you find a pice you really like. 
4. When an item is clicked on, you will be directed to a page that gives full details and an enlarged image to view.
5. Here in the piece's detail view lies your favoriting area.  If you wish to include this piece in your own wall, you may choose it now.  If a piece is already favorited, you have the choice to unfavorite using the updated "remove from favorites" button.
6. When favorites are viewed by clicking "My favorites" button from the header, you will see your own personal collection of art.  As your favorites grows, this view can become a more and more unique wall with each click of the wall-rendering logo.
7. Search Options: The button entitled "Search Terms" takes you to a screen that allows you to type in two words to create your own search.  The possibilities are endless even with only this simple mechanism.  Search a few words and start your journey through the Met by submitting them and refreshing the wall to display your search.

## Technologies used 
In this project, I researched and included React's built-in Context API and Reducer to apply state to a global context available to each Component and everywhere that gets wrapped in the Context Provider.  It was a lot to take on at first but very rewarding.  The initial state gets updated by way of dispatching actions with a payload to the reducer.  React hooks are used less frequently in a build like this but are still available for use in Component updating. Here is some of the technology I have used in this App:
1. React Hooks
2. React Context API
3. API Courtesy of the Metropolitan Museum
4. Testing with Cypress

#### Future Updates:  Although Cypress is used for testing all user flows, the search function is an extension and is not as interesting as it could be.  This was not a ticket or part of the MVP and a fun addition that I think could be implemented in a section of dropdown menus, possibly with different eras and fully tested.

## Contributors:
[Chuck Morris Github](https://github.com/percworld)

[Reggie Thompson](https://github.com/rdtho2525)
