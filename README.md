# Technobabble Generator
This has been built on [react-starter](https://github.com/samwaters/react-starter) by Sam Waters

It creates star trek sounding names of machinery/equipemnt/procedures

## Installation
use npm or yarn to install node modules, build the dev bundle and serve the pages in express;
```
npm install
npm run build.dev
npm start
```

## Changing the application
I've been lazy, the code that handles the randomisation is all in babble.jsx. 
It assigns weighted scores to words based on what category or department has been selected. Have a look and change the weighting values if you want.

## Contributing to the word list
This is the fun part. In the dist folder, you'll find data.json. This is where you can contribute the most.

You'll find an array called prefix. There's a 20% chance that one of these words will get stuck on the start of the generated machine. Add extra words, bearing in mind we don't want to end up with a quantum quantum phase inverter.

next we have 3 lists of words. The first one is noramlly an adjective e.g. 'photonic'. The second one is often a noun e.g. 'torpedo'. The 3rd is verby, e.g. 'deflector' so I think that makes it a noun as its the name of a thing based on an action.... I'm not great with grammar!
these words all have a scoring system. 'primary' has to be set to one of the entries in categories, or 'general'. e.g set it to weapons so that when generating a weapon, this word will be given a score of 20. an optional 'secondary' in something like engineering means this word will be given a score of 15 if you're looking for engineering machines. 'general' means it will be included with a low score on everything, regardless of category selected.

It's almost entirely data driven, so if you add a new category, it will immediately become available in the drop down box and words with a primary or secondary of that new category will start to be used.

have fun! and don't forget to create pull requests for your new categories and words so we can grow the monster!
