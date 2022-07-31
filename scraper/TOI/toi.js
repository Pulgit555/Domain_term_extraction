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
// url = "https://timesofindia.indiatimes.com/gadgets-news/realme-narzo-50a-prime-tipped-to-launch-in-india-soon/articleshow/90800374.cms"


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
      // console.log(error);
    });
  return html;
}

async function getHeading(html) {
  let heading=""
  const $ = cherrio.load(html);
  const span = $("._23498");
  return span.text()
}

async function getText(html) {
  totalText = "";
  const $ = cherrio.load(html);
  const span = $(".ga-headlines");
  // const text=span.find("p").text()
  if(span[0]!=undefined && span[0].children[0]!=undefined){
    for(let i=0;i<span[0].children.length;i++){
      if(!span[0].children[i].type && span[0].children[i].type==="text"){
        totalText+= span[0].children[i].data
        totalText+= " "
      }
      else if(!span[0].children[i].name && span[0].children[i].name==='span'){
        if (!span[0].children[i].children[0].type && span[0].children[i].children[0].type==='text'){
          totalText+= span[0].children[i].children[0].data
          totalText+= " "
        }
      }
    }
  }
  return totalText;
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
      var temp=[count,"TOI",data["url"],data["heading"],data["text"]]
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


