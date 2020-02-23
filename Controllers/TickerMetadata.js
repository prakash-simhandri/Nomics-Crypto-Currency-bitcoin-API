module.exports = (tickerApp, knex, axios, CircularJSON)=>{
    tickerApp.get("/ticker_data_upload",(req,res)=>{
        axios
        .get("https://api.nomics.com/v1/currencies/ticker?key="+process.env.NOMICS_API_KEY)
        .then((data)=>{
            var nomics_dara = CircularJSON.stringify(data)
            var whole_Data = JSON.parse(nomics_dara)
            res.send({"Whole data length ":whole_Data.data.length})
            // res.send(whole_Data.data)
            var i=0;
            var myfunc = setInterval(function(){
                
                var other_dict = {}
                for (const [key, value] of Object.entries(whole_Data.data[i])) {
                    if("id"==key) {
                        var privet_id = value
                        other_dict["id"] = privet_id

                    }else if("1d"== key){
                        value["id"] = privet_id

                        knex('Ticker_1d').insert(value)
                        .then((data)=>{
                            // console.log("1d Done")
                        }).catch((err)=>{
                            console.log("1d Done",err)
                        })

                    }else if("7d" == key){
                        value["id"] = privet_id

                        knex('Ticker_7d').insert(value)
                        .then((data)=>{
                            // console.log("7d Done")
                        }).catch((err)=>{
                            console.log("7d",err)
                        })

                    }else if("30d" == key){
                        value["id"] = privet_id

                        knex('Ticker_30d').insert(value)
                        .then((data)=>{
                            // console.log("30d Done")
                        }).catch((err)=>{
                            console.log("30d",err)
                        })

                    }else if("365d" == key){
                        value["id"] = privet_id
                        
                        knex('Ticker_365d').insert(value)
                        .then((data)=>{
                            // console.log("365d Done")
                        }).catch((err)=>{
                            console.log("365d",err)
                        })

                    }else if("ytd" == key){
                        value["id"] = privet_id
                        
                        knex('Ticker_ytd').insert(value)
                        .then((data)=>{
                            // console.log("ytd Done")
                        }).catch((err)=>{
                            console.log("ytd",err)
                        })

                    }else{
                        other_dict[key] = value
                    }
                }
                knex('Ticker').insert(other_dict)
                        .then((data)=>{
                            // console.log("Ticker Done..")
                        }).catch((err)=>{
                            console.log("Ticker",err)
                        })
                        
                console.log(i+1,"Next data is coming soon!...")

                i = i + 1;
                if(i==whole_Data.data.length-1) {
                    clearInterval(myfunc);
                }
            }, 1000/4);
            
        }).catch((err)=>{
            console.log("Error",err)
        })
    })
}