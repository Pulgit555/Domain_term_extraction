const axios = require("axios");
const cherrio = require("cheerio");
const ObjectsToCsv = require('objects-to-csv')
const readLine = require('readline');
const f = require('fs');
const { randomInt } = require("crypto");

const rl = readLine.createInterface({
  input : f.createReadStream("./temp.txt"),
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
  const span = $("._23498");
  return span.text()
}

async function getText(html) {
  totalText = "";
  const $ = cherrio.load(html);
  const span = $(".ga-headlines");
  // const text=span.find("p").text()
  for(let i=0;i<span[0].children.length;i++){
    if(span[0].children[i].type==="text"){
      totalText+= span[0].children[i].data
      totalText+= " "
    }
    else if(span[0].children[i].name==='span'){
      if (span[0].children[i].children[0].type==='text'){
        totalText+= span[0].children[i].children[0].data
        totalText+= " "
      }
    }
  }
  return totalText;
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
      console.log(url)
      // var temp=["TOI",data["url"],data["heading"],data["text"]]
      // const csv = new ObjectsToCsv([temp])
      // csv.toDisk('./toi_data.csv', { append: true })
      // console.log(count,url,"Done");
      // count+=1
    });
  });
}

run().then((data)=>{
  console.log("HELLO")
})


