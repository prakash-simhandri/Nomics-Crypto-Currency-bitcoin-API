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
                        other_dict[key] = privet_id

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
                        
                console.log(i+1,"Next data is coming !...")

                i = i + 1;
                if(i==whole_Data.data.length) {
                    clearInterval(myfunc);
                }
            }, 1000/50);
            
        }).catch((err)=>{
            console.log("Error",err)
        })
    })

    // get the OrderBy All data
    
    tickerApp.get('/ticker_oderby_data',(req,res)=>{
        knex.select ( "rank","price","price_date","market_cap","circulating_supply","max_supply","high","high_timestamp")
        .from ( "Ticker" )
        .orderBy ( "rank" )
        .then (( data ) => {
            res.send ( data );
        }).catch (( err ) => {
            console.log ( err );
            res.send ( "Something went wrong....!");
        });
    })

    // get the OderBy data for user choice (rank, price, price_date, market_cap) 

    tickerApp.get("/ticker_oderby/:query",(req,res)=>{

        knex.select ( "rank","price","price_date","market_cap","circulating_supply","max_supply","high","high_timestamp")
        .from ( "Ticker" )
        .orderBy ( req.params.query )
        .then (( data ) => {
            res.send ( data );
        }).catch (( err ) => {
            console.log ( err );
            res.send ( "Something went wrong....!");
        });
        
    })

    // get the all total ticker data

    tickerApp.get("/ticker_get_all_data",(req,res)=>{
        Ticker_data = []
       knex.select('*').from('Ticker')
       .then((data)=>{
           var index = 0
           const Rec = setInterval(() => {

            var connection_data = Object.assign({},data[index])
            knex.select("price_change","price_change_pct","volume","volume_change","volume_change_pct","market_cap_change","market_cap_change_pct")
            .from("Ticker_1d").where("id",data[index].id)
                .then((result_1d)=>{
                    connection_data["1d"]=Object.assign({},result_1d[0])
                }).catch((reject_1d)=>{
                    console.log(reject_1d)
                })

            knex.select("price_change","price_change_pct","volume","volume_change","volume_change_pct","market_cap_change","market_cap_change_pct")
            .from("Ticker_30d").where("id",data[index].id)
                .then((result_30d)=>{
                    connection_data["30d"]=Object.assign({},result_30d[0])
                }).catch((reject_30d)=>{
                    console.log(reject_30d)
                })

            knex.select("price_change","price_change_pct","volume","volume_change","volume_change_pct","market_cap_change","market_cap_change_pct")
            .from("Ticker_365d").where("id",data[index].id)
                .then((result_365d)=>{
                    connection_data["365d"]=Object.assign({},result_365d[0])
                }).catch((reject_365d)=>{
                    console.log(reject_365d)
                })
            
            knex.select("price_change","price_change_pct","volume","volume_change","volume_change_pct","market_cap_change","market_cap_change_pct").from("Ticker_7d").where("id",data[index].id)
                .then((result_7d)=>{
                    connection_data["7d"]=Object.assign({},result_7d[0])
                }).catch((reject_7d)=>{
                    console.log(reject_7d)
                })

            knex.select("price_change","price_change_pct","volume","volume_change","volume_change_pct","market_cap_change","market_cap_change_pct").from("Ticker_ytd").where("id",data[index].id)
                .then((result_ytd)=>{
                    connection_data["ytd"]=Object.assign({},result_ytd[0])

                }).catch((reject_ytd)=>{
                    console.log(reject_ytd)
                })

            Ticker_data.push(connection_data)
            index = index + 1;

            if(index ==data.length) {
                clearInterval(Rec);
            }
       
            if(data.length == index){
                res.send(Ticker_data)
                console.log(Ticker_data)
               }
           },0);
           
       }).catch((err)=>{
           res.send(err)
       })
    })
}