const express = require('express');
const yelp = require('yelp-fusion');
const app = express();
const port = process.env.PORT || 5000;
let apiKey = 'ynSi1puYiRrU5pUglwyhsAJqELqZcHgwRpOVGYKfPmtcvL6LPeyQ7spfigy7-pJlxOn12_wmNB-830S0NW5PF1aVH5jTEJ8gLi8zEgIrgQdyi1_ktTfrfzKPa9YzW3Yx';
const client = yelp.client(apiKey);


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

app.listen(port, () => console.log(`Listening on port ${port}`));
