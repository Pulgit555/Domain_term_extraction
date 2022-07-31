const axios = require("axios");
const cherrio = require("cheerio");
const ObjectsToCsv = require('objects-to-csv')
const readLine = require('readline');
const f = require('fs');
const { randomInt } = require("crypto");

const rl = readLine.createInterface({
  input : f.createReadStream("./list.txt"),
  output : process.stdout,
  terminal: false
});


async function getHTML(productURL) {
  const { data: html } = await axios
    .get(productURL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.90 Safari/537.36",
      },
    })
    .catch(function (error) {
      console.log("oops!!!")
      // console.log(error);
    });
  return html;
}

async function getHeading(html) {
  let heading=""
  const $ = cherrio.load(html);
  const span = $("h1");
  return span.text()
}

async function getText(html) {
  const $ = cherrio.load(html);
  const span = $("#article-body");
  const text=span.find("p").text()
  return text
}

async function extractData(id,url) {
  const html = await getHTML(url);
  const Newsheading = await getHeading(html);
  const Newstext = await getText(html);
  let articleDetails = {url:"",heading:"",text:""}
  articleDetails.url = url;
  articleDetails.heading = " "+Newsheading;
  articleDetails.text = " "+Newstext;
  return articleDetails;
}
async function run(){
  let count=0
  rl.on('line', function (url) {
    extractData(count,url).then((data) => {
      // console.log(data);
      var temp=[data["url"],data["heading"],data["text"]]
      const csv = new ObjectsToCsv([temp])
      csv.toDisk('./data.csv', { append: true })
      console.log(count,url,"Done");
      count+=1
    });
  });
}

run().then((data)=>{
  console.log("HELLO")
})


