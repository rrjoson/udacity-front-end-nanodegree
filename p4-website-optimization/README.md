## Website Performance Optimization Portfolio Project
---

I optimized the index.html to achieve at least a PageSpeed score of 90. I also optimized the JavaScript (main.js) in pizza.html. Lastly, I also reduced the time to resize the pizzas using the slider in pizza.html.

#### How to Run:
* Install the project on your machine by either cloning the repository using git or by clicking the download zip button. To view the optimized page, just double-click index.html

#### Part 1: Optimize PageSpeed Insights score for index.html
* Add a print media query to print.css in
* Transfer contents of views folder to the root folder
* Create a small version of pizzera.jpg for use in index.html
* Elminate render blocking of google-analytics script using async
* Use Web Font Loader to load the Google webfont asynchornously
* Inline css/style.css
* Use Grunt to:
* Minify CSS
* Uglify JS
* Minify HTML
* Optimize images


Sources:
https://scotch.io/tutorials/a-simple-guide-to-getting-started-with-grunt

#### Part 2: Optimize Frames per Second in pizza.html
* Move the document.body.scrollTop out of the loop in updatePositions
* Set the number of pizzas to 36 in document.addEventListener('DOMContentLoaded', function()
* Move the phase value calculation outside the loop and push the 5 unique phase values for each scroll to an array
* Replace "querySelector" with getElementById in document.querySelector("#movingPizzas1").appendChild(elem);
* Replace "querySelectorAll" with getElementsByClassName in document.querySelectorAll(".randomPizzaContainer")
* Change CSS for .mover: Add backface-visibility: hidden; transform: translateZ(0);
* Declare the var phase outside the loop to prevent it from being created each iteration.
* Move items var to avoid redefining it in updatePositions function
* Declare movingPizzas1 variable outside the loop to avoid accessing the DOM every iteration

Sources:
https://github.com/lacyjpr/optimization
https://github.com/udacity/fend-office-hours/tree/master/Web%20Optimization/Effective%20Optimizations%20for%2060%20FPS

#### Part 3: Optimize Time to Resize Pizzas in pizza.html
* Removed determinDx function to simplify the process of the changing the size of the pizzas.
* In the changePizzaSizes function, the randomPizzas variable was created so the querySelectorAll method only runs once outside the loop.
* Refactor the code inside the for loop in changePizzaSizes funciton to use a percentage value instead of converting it to pixels.
* Create the randomPizzas variable so the getElementsByClassName Web API Call only runs once outside the loop.
* Declare randomPizzasLength variable outside the loop to avoid calling the length property every iteration in the changePizzaSizes function.
* Declare pizzasDiv outside the loop so it makes one DOM call only.
* Replace querySelector with the faster getElementById

Sources:
https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName