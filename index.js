
// const fetch = global.fetch || require('node-fetch'); // Node 18+ has fetch built-in

// const express = require('express');
// //const bodyParser = require("body-parser");
// const cors = require('cors')
// const app = express();
// app.use(express.json());

// const port = 3000;

// const config = {
//     origin: "http://127.0.0.1:8080",
//     methods: "POST,GET"
// }
// app.use(cors(config))
// //app.use(bodyParser.text({ type: 'text/plain' }));


// app.post('/data', (req, res) => {
 
//   console.log("req.body.url="+JSON.stringify(req.body.url))
// const a= async () => {
//   try {
//     console.log(1)
//     const response = await fetch(req.body.url); //https://example.com
//         console.log(2)

//     const html = await response.text();
//     console.log(3)

//     const parser = new (require('jsdom').JSDOM)(html);
//         console.log(4)

//     const document = parser.window.document;
//         console.log(5)

//     const anchors = document.querySelectorAll('a');
//         console.log(6)

// //console.log("anchors="+anchors)
//     const urls = Array.from(anchors)
//       .map(a => a.href)
//       .filter(href => href && href.startsWith('http'));
//     console.log(7)

//     console.log(`Found ${urls.length} URLs:`);
//         console.log(8)

//     //urls.forEach(u => console.log(u));
//         console.log(9)

// //console.log("2 urls="+urls)

// res.json(urls)

//   } catch (error) {
//      console.error('Error fetching or parsing page:', error);
//   }

// }

// a("https://sports.yahoo.com/article/nyy-news-jeter-speaks-mind-090000763.html")

// });

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

const express = require('express');
const cors = require('cors')
const app = express();

app.use(express.json());

const config = {
    origin: "http://127.0.0.1:8080",
    methods: "POST"
}
app.use(cors(config))

app.post('/data', (req, res) => {
  // const text = req.body.text;
  // console.log('Received text:', text);
  // res.json({ received: text });
  //   console.log("req.body.url="+JSON.stringify(req.body.url))
const a = async (url) => {
  try {
    console.log(1)
    const response = await fetch(url); //https://example.com
        console.log(2)

    const html = await response.text();
    console.log(3)

    const parser = new (require('jsdom').JSDOM)(html);
   
        console.log(4)

    const document = parser.window.document;
        console.log(5)

    const anchors = document.querySelectorAll('a');
        console.log(6)

//console.log("anchors="+anchors)
    const urls = Array.from(anchors)
      .map(a => a.href)
      .filter(href => href && href.startsWith('http'));
    console.log(7)

    console.log(`Found ${urls.length} URLs:`);
        console.log(8)

    //urls.forEach(u => console.log(u));
        console.log(9)

//console.log("2 urls="+urls)

res.json(urls)

  } catch (error) {
     console.error('Error fetching or parsing page:', error);
  }

}

a(req.body.url)



});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});