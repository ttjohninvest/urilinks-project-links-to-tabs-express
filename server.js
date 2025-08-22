

const express = require('express');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3000

app.use(express.json());
//urilinks-project-urls-to-tabs-html.vercel.app
//http://127.0.0.1:8080
// const config = {
//     origin: "https://urilinks-project-urls-to-tabs-html.vercel.app",
//     methods: "POST"
// }
// app.use(cors(config))

const allowedOrigins = [
  'https://urilinks-project-urls-to-tabs-html.vercel.app',
  'https://urilinks.com'
];

const corsOptions = {
  origin: function (origin, callback) {
    // Check if the origin is in the allowed list
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      // Allow the request if origin is in the list or if no origin is present (e.g., server-to-server)
      callback(null, true);
    } else {
      // Reject the request if origin is not in the list
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods:"POST"
};

// Apply the cors middleware with the options
app.use(cors(corsOptions));

const removeDuplicates = (arr) => arr.filter((item, index) => arr.indexOf(item) === index);
//const removeDuplicates= (arr) => [...new Set(arr)];

function  removeForwardSlashes(urls) {
//url.replace(/\/+$/, '');
let r=[]
let i = 0
urls.forEach((url) => {
r[i++]=url.replace(/\/+$/, '');
});

return r

}


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

    const urls = Array.from(anchors)
      .map(a => a.href)
      .filter(href => href && href.startsWith('http'));
    console.log(7)
    const urls2 = [req.body.url,...urls] //I added the passed domain name to the list so I derive its hashtag from it
    //and append it to each hashtag derived from the urls on the page for example #6pm#amazon
    //now #amazon will be in the bookmarks file so i can append it to #6pm in /fetchbookmarks
    console.log(`Found ${urls.length} URLs:`);
        console.log(8)

    //urls.forEach(u => console.log(u));
        console.log(9)
if(urls2.length > 0) {
        const resArray = removeForwardSlashes(urls2)

//console.log("2 urls="+urls)

res.json(removeDuplicates(resArray))
} else {
  res.json([])
}

  } catch (error) {
     console.error('Error fetching or parsing page:', error);
  }

}

a(req.body.url)



});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});