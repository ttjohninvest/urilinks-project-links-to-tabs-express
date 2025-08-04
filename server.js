

const express = require('express');
const cors = require('cors')
const app = express();

app.use(express.json());
//urilinks-project-urls-to-tabs-html.vercel.app
//http://127.0.0.1:8080
const config = {
    origin: "https://urilinks-project-urls-to-tabs-html.vercel.app",
    methods: "POST"
}
app.use(cors(config))

const removeDuplicates = (arr) => arr.filter((item, index) => arr.indexOf(item) === index);

app.post('/', (req, res) => {
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

res.json(removeDuplicates(urls))

  } catch (error) {
     console.error('Error fetching or parsing page:', error);
  }

}

a(req.body.url)



});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});