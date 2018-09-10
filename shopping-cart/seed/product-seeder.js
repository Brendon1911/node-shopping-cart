var Product = require('../models/product');
var mongoose = require('mongoose');

mongoose.connect('mongodb://brendon1911-node-shopping-cart-6381074/shopping-cart', { useNewUrlParser: true });

var products = [
    new Product({
    imagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Gothiccover.png/220px-Gothiccover.png',
    title: 'Gothic PC Game',
    discription: "This is one of the most best western RPGS out there. It wasn't very well recieved outside Germany, but that was mostly due to poor marketing.",
    price: 10
  }),
  new Product({
    imagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/57/Doom_cover_art.jpg/220px-Doom_cover_art.jpg',
    title: 'Doom PC Game',
    discription: "It's Doom... The grandfather of the FPS genre. Sure, Wolfenstien 3D cam before, but Doom Really semented the FPS genere in gaming",
    price: 10
  }),
  new Product({
    imagePath: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d5/Diablo_II_Coverart.png/220px-Diablo_II_Coverart.png',
    title: 'Gothic PC Game',
    discription: "This is Diablo 2. One of the greatest loot based action role playing games. ALthough some would argue as to how much of a role playing game Diablo 2 really is, it is definitely fun and addictive.",
    price: 10
  })
];

var done = 0;
for (var i = 0; i < products.length; i++) {
  products[i].save((err, result) => {
    done++;
    if (done === products.length) {
      exit();
    } else {
      console.log(err);
    }
  });
}

function exit () {
  mongoose.disconnect(); 
}