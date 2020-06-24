const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

app.use(bodyParser.urlencoded({
    extended: false
  }));

app.use(bodyParser.json());

const cors = require('cors')

app.use(cors());
app.options('*', cors());

app.post('/', function (req, res) {

    const searchWord = async (query) => {

        final_query = encodeURI(query)

        const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${final_query}&components=country:il&types=geocode&language=fr&key=ApiKey`
        let response = await fetch(url, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type',
                'Access-Control-Allow-Methods': 'POST, GET'
            }
        })
        let data = await response.json()
        let suggestions = []
        await data['predictions'].map((item)=>{
            suggestions.push(item['description'])
        })
        
        res.json(suggestions)
    }

    searchWord(req.body.value)
})

app.post('/location', function(req,res){
    console.log(req.body)
    res.json(req.body)
})


app.listen(3100, function () {
    console.log('Example app listening on port 3100!')
})
