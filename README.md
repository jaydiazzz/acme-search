# acme search
https://jays-acme-search.herokuapp.com/

## Project setup
```
npm install
```

upload ```calendar.json```, ```contacts.json```, ```dropbox.json```, ```slack.json```, and ```tweet.json``` to the ```src/assets/data``` folder

```
npm run serve
```

### Additional features
A couple of key features that I implemented in this project were, responsiveness, dynamic updates to data, pinning of search results, and a basic search algorithm.

### Approach
During my time of planning out this project, I initially had the two sections of pinning results and search results, side by side, however, after designing the page I realized that if I were to carry this design out, it would be close to impossible to have a responsive design for if the page is shorter than the necessary height for all the content. If the page is too short for all the content we would have a hard time scrolling through and keeping the look of symmetry going as one side would be empty for quite a bit in comparison to the other side. This whole dilemma led me to restructure the design so they were vertically stacked containers and not side by side anymore. This was what I most had trouble with for the design process although it was easy to overcome, it still was a huge factor in how I would later on work on the responsiveness for my app. In my development, the hardest portion of my coding process was most likely the real-time updates. This was a hard choice because I had to choose between adding a lot of code and possible implementation of API's (such as firebase) or allowing the user to experience a small diminish towards their overall speed of the application. I chose the option of sacrificing speed due to the time constraints of only a few hours and because our current data set is so small. If I had the time necessary, I  would like to go back and refactor/optimize that approach. Currently what we do is we have a computed variable that is based on the data set provided. Whenever our data set is changed, it sends a waterfall effect to our search results and our pinned results.
