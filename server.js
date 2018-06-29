const express = require('express');
const yelp = require('yelp-fusion');


const app = express();
const port = process.env.PORT || 5000;
let apiKey = 'ynSi1puYiRrU5pUglwyhsAJqELqZcHgwRpOVGYKfPmtcvL6LPeyQ7spfigy7-pJlxOn12_wmNB-830S0NW5PF1aVH5jTEJ8gLi8zEgIrgQdyi1_ktTfrfzKPa9YzW3Yx';
const client = yelp.client(apiKey);


const bodyParser = require('body-parser')
const cors = require('cors')
// const client = yelp.client("hxp7yqGWKyaIvgLRT0d4946GZRAKUxCTJy3mHGG0Es-UpLfc71F-BAWXWwFOLipfLZTPIUf3qw3cB8HXndgyok_pkQhW19SUaU0d72IDXrzqtOJRd1UMpfn4byg1W3Yx");
const app = express();

app.use(cors());

// app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// const port = process.env.PORT || 8080;

app.post('/api', (req, res) => {
  console.log(req.body)
  res.json({ express: 'Hello From Express' });
});


app.get('/api', (req, res) => {
 client.search({
   offset: 5,
   categories: 'bubbletea',
   location: 'toronto, on',
 }).then(response => {
  const businesses = response.jsonBody.businesses;
  const restaurantData = [];
  console.log(response.jsonBody.businesses.categories)

  businesses.map(business => {
    const data = {name: business.name, image: business.image_url, rating: business.rating };
    restaurantData.push(data)
  })

  console.log('restaurantData', restaurantData);

   res.send(restaurantData);

 }).catch(e => {
   console.log(e);
 });
});


app.get("/api/preferences", (req, res) => {

});

// function getName(array) {
//   var listOfRestaurants = [];
//  for(var i = 0; i < array.length; i++){
//    listOfRestaurants.push(array[i].name)
//    // listOfRestaurants.push(array[i].coordinates)
//    listOfRestaurants.push(array[i].categories[0].alias)
//  }
//  return listOfRestaurants;
// }


app.listen(port, () => console.log(`Listening on port ${port}`));



//hello

