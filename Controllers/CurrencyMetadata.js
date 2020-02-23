module.exports = (currencyApp, knex, axios, CircularJSON)=>{
    currencyApp.get("/currencies_data_upload",(req,res)=>{
        // console.log(process.env.NOMICS_API_KEY)
        axios
        .get("https://api.nomics.com/v1/currencies?key=" + process.env.NOMICS_API_KEY+"&attributes=original_symbol,name,description,website_url,logo_url,blog_url,discord_url,facebook_url,github_url,medium_url,reddit_url,telegram_url,twitter_url,youtube_url")
        .then(resp => {
            var main_data = CircularJSON.stringify(resp)
            let whole_data = JSON.parse(main_data) 
            console.log(whole_data.data.length)

            let i=0;

            var myfunc = setInterval(function(){
                knex('Currencies').insert(whole_data.data[i])
                    .then((data)=>{
                        console.log(i,"Data insert Successfully...")
                    }).catch((err)=>{
                        console.log(err.message)
                    })

                    i = i + 1;

                if(i==whole_data.data.length-1) {
                    clearInterval(myfunc);
                }

            }, 1000/5);
            res.send({"All data lngthe":resp.data.length})
        })
        .catch(err => {
          console.log("Error fetching data from nomics", err);
        });
    })

    currencyApp.get("/currencise_all_data",(req,res)=>{
        knex.select('*').from('Currencies').then((data)=>{
            console.log(data.length)
            var count = 0
            var data_list = []
            var new_list = []
            for(let one_data of data){
                if (count == 10) {
                    new_list.push(data_list)
                    data_list =[]
                    count=0
                }else{
                    data_list.push(one_data)
                    count+=1
                }
            }
            res.send(new_list)
            let i=0;

            var myfunc = setInterval(function(){

                console.log(new_list[i]); 
                i = i + 1;

                if(i==data.length-1) {
                    clearInterval(myfunc);
                }

            }, 1000);
            
        }).catch((err)=>{
            res.send(err.message)
        })
          
    })
}