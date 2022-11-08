// simple example of an express api with mongoose with CRUD routes 
import express from 'express'
import ISOAlphaCountries from './ISOAlphaCountries.json' //assert {type: "json"}

//import {router} from "./routes"

const app = express();
app.use(express.json());
const port = process.env.PORT || 8080;

const countryWishlist = ISOAlphaCountries.slice(0, 5);


//GET /api/countries
app.get('/api/countries', (req, res) => {
    //check query parameter
    if(req.query.sort) return res.send(countryWishlist.sort((a, b) => a.englishShortName > b.englishShortName ? 1 : -1));
    res.send(countryWishlist);
    
})
//POST /api/countries
app.post('/api/countries', (req, res) => {
    const country = req.body;
    //validate
    if(!country.englishShortName || 
        !country.frenchShortName || 
        !country.alpha2Code ||
        !country.alpha3Code ||
        !country.numeric
        ) return res.status(400).send('Bad Request, missing request fields, must have: englishShortName, frenchShortName, alpha2Code, alpha3Code, numeric');
    //check for duplicates
    if(countryWishList.find(c => {
        return c.englishShortName === country.englishShortName || 
        c.frenchShortName === country.frenchShortName || 
        c.alpha2Code === country.alpha2Code || 
        c.alpha3Code === country.alpha3Code ||
        c.numeric === country.numeric;
    })) return req.status(409).send('Conflict');
    countryWishList.push(country)
    res.send(country)
})

//GET /api/countries/:code
/* app.get('/api/countries/:code', (res, req) => {
    const country = countryWishList.find(c => c.alpha2Code === req.params.code || c.alpha3Code === req.params.code)
    if(!country) return res.status(404).send('Not Found!');
    res.send(country);
}) */
app.get('/api/countries/:code', (req, res) => {
    const country = countryWishlist.find(c => c.alpha2Code === req.params.code || c.alpha3Code === req.params.code);
    res.send(country);
});

// middleware to check if country exists
const checkCountryExists = (req, res, next) => {
    const country = countryWishlist.find(c => c.alpha2Code === req.params.alpha2Code);
    if(!country) return res.status(404).send('Country not found');
    next();
}
app.use('/api/countries/:code', checkCountryExists);
//PUT /api/countries/:code)
app.put('/api/countries/:code', (req, res) => {
    // find the index of the matching country
    const countryIndex = countryWishlist.findIndex(c => c.alpha2Code === req.params.code || 
        c.alpha3Code === req.params.code);

    const updatedCountry = req.body;
    // if the updated country is missing required fields, return 400
    if(!updatedCountry.englishShortName || 
        !updatedCountry.frenchShortName || 
        !updatedCountry.alpha2Code || 
        !updatedCountry.alpha3Code || 
        !updatedCountry.numeric) return res.status(400).send('bad request, missing required fields, must have: englishShortName, frenchShortName, alpha2Code, alpha3Code, numeric');
    
    // update the country in the array
    countryWishlist[countryIndex] = updatedCountry;

    // return the updated country
    res.send(countryWishlist[countryIndex]);
});
//DELETE /api/countries/:code
app.delete('/api/countries/:code', (req, res) => {
    // find the index of the matching country
    const countryIndex = countryWishlist.findIndex(c => c.alpha2Code === req.params.code || c.alpha3Code === req.params.code);

    // remove the country from the array
    countryWishlist.splice(countryIndex, 1);

    // its typical to send status 204 for a successful delete
    res.sendStatus(204);
});


app.listen(port, () => console.log(`Server connected to port ${port}`))