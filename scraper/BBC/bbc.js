const axios = require("axios");
const cherrio = require("cheerio");
const ObjectsToCsv = require('objects-to-csv')
const readLine = require('readline');
const f = require('fs');

const rl = readLine.createInterface({
  input : f.createReadStream("./temp.txt"),
  output : process.stdout,
  terminal: false
});


async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
} 

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
    });
  return html;
}

async function getHeading(html) {
  let heading=""
  const $ = cherrio.load(html);
  const span = $("#main-content  #main-heading");
  return span.text()
}

async function getText(html) {
  totalText = "";
  const $ = cherrio.load(html);
  const span = $("article");
  const text=span.find("p").text()
  return text;
}

async function extractData(id,url) {
  let articleDetails = {url:"",heading:"",text:""}
  const html = await getHTML(url)
  const newsHeading = await getHeading(html);
  const newsText = await getText(html);
  articleDetails.url = url;
  articleDetails.heading = " "+newsHeading;
  articleDetails.text = " "+newsText;
  return articleDetails;
}

async function run(){
  let count=0
  rl.on('line', async function (url) {
    await extractData(count,url).then((data) => {
      var temp=[count,"BBC",data["url"],data["heading"],data["text"]]
      console.log(temp)
      const csv = new ObjectsToCsv([temp])
      csv.toDisk('./full.csv', { append: true })
      console.log(count,url,"Done");
      count+=1
    })
    .catch(function (error) {
      console.log(error);
      count+=1
    });
  });
}

run().then((data)=>{
  console.log("HELLO")
})


