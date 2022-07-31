const axios = require('axios')

const getBreeds = async () => {
  try {
    return await axios.get('https://toifeeds.indiatimes.com/treact/feeds/toi/web/show/topic?path=/topic/technology-news/news&row=1&curpg=1')
  } catch (error) {
    console.error(error)
  }
}

const countBreeds = async () => {
  const breeds = await getBreeds()

  console.log(breeds)
}

countBreeds()
  var data= await axios.get("https://toifeeds.indiatimes.com/treact/feeds/toi/web/show/topic?path=/topic/technology-news/news&row=1&curpg=1").then(data=>{
    console.log(data)
  })
countBreeds()
// var newsBlob=data["contentsData"]["items"]
// fs.writeFile ("urls.json", JSON.stringify(newsBlob), function(err) {
//   if (err) throw err;
//   console.log('complete');
//   }
// );