var knex = require('knex')({
    client: "mysql",
    connection: {
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database
    }
})

knex.schema.hasTable('Currencies').then(function(exists) {
    if (!exists) {
        knex.schema.createTable('Currencies', function(table) {
        table.text('original_symbol')
        table.text('name');
        table.text('description');
        table.text('website_url');
        table.text('logo_url');
        table.text('blog_url');
        table.text('discord_url');
        table.text('facebook_url');
        table.text('github_url');
        table.text('medium_url');
        table.text('reddit_url');
        table.text('telegram_url');
        table.text('twitter_url');
        table.text('youtube_url');
        }).then(() =>{
            console.log("Currencies table created successfully!")
        }).catch((err) =>{
            console.log("Currencies table create problem.");
        })
    }else{
        // console.log("Currencies Database On..")
    }
    });

knex.schema.hasTable('Ticker').then(function(exists){
    if (!exists) {
        knex.schema.createTable('Ticker', function(table) {
            table.string('id');
            table.string('currency');
            table.string('symbol');
            table.string('name');
            table.string('logo_url');
            table.string('rank');
            table.string('price');
            table.string('price_date');
            table.string('market_cap');
            table.string('circulating_supply');
            table.string('max_supply');
            table.string('high');
            table.string('high_timestamp');
            }).then(() =>{
                console.log("Ticker table created successfully!")
            }).catch((err) =>{
                console.log("Ticker table create problem.");
            })
    } else {
        // console.log("Ticker Database On..")
    }
})

knex.schema.hasTable('Ticker_1d').then(function(exists){
    if (!exists) {
        knex.schema.createTable('Ticker_1d', function(table) {
            table.string('id');
            table.string('price_change');
            table.string('price_change_pct');
            table.string('volume');
            table.string('volume_change');
            table.string('volume_change_pct');
            table.string('market_cap_change');
            table.string('market_cap_change_pct');
            }).then(() =>{
                console.log("Ticker_1d table created successfully!")
            }).catch((err) =>{
                console.log("Ticker_1d table create problem.");
            })
    } else {
        // console.log("Ticker_1d Database On..")
    }
})

knex.schema.hasTable('Ticker_7d').then(function(exists){
    if (!exists) {
        knex.schema.createTable('Ticker_7d', function(table) {
            table.string('id');
            table.string('price_change');
            table.string('price_change_pct');
            table.string('volume');
            table.string('volume_change');
            table.string('volume_change_pct');
            table.string('market_cap_change');
            table.string('market_cap_change_pct');
            }).then(() =>{
                console.log("Ticker_7d table created successfully!")
            }).catch((err) =>{
                console.log("Ticker_7d table create problem.");
            })
    } else {
        // console.log("Ticker_7d Database On..")
    }
})

knex.schema.hasTable('Ticker_30d').then(function(exists){
    if (!exists) {
        knex.schema.createTable('Ticker_30d', function(table) {
            table.string('id');
            table.string('price_change');
            table.string('price_change_pct');
            table.string('volume');
            table.string('volume_change');
            table.string('volume_change_pct');
            table.string('market_cap_change');
            table.string('market_cap_change_pct');
            }).then(() =>{
                console.log("Ticker_30d table created successfully!")
            }).catch((err) =>{
                console.log("Ticker_30d table create problem.");
            })
    } else {
        // console.log("Ticker_30d Database On..")
    }
})

knex.schema.hasTable('Ticker_365d').then(function(exists){
    if (!exists) {
        knex.schema.createTable('Ticker_365d', function(table) {
            table.string('id');
            table.string('price_change');
            table.string('price_change_pct');
            table.string('volume');
            table.string('volume_change');
            table.string('volume_change_pct');
            table.string('market_cap_change');
            table.string('market_cap_change_pct');
            }).then(() =>{
                console.log("Ticker_365d table created successfully!")
            }).catch((err) =>{
                console.log("Ticker_365d table create problem.");
            })
    } else {
        // console.log("Ticker_365d Database On..")
    }
})

knex.schema.hasTable('Ticker_ytd').then(function(exists){
    if (!exists) {
        knex.schema.createTable('Ticker_ytd', function(table) {
            table.string('id');
            table.string('price_change');
            table.string('price_change_pct');
            table.string('volume');
            table.string('volume_change');
            table.string('volume_change_pct');
            table.string('market_cap_change');
            table.string('market_cap_change_pct');
            }).then(() =>{
                console.log("Ticker_ytd table created successfully!")
            }).catch((err) =>{
                console.log("Ticker_ytd table create problem.");
            })
    } else {
        // console.log("Ticker_ytd Database On..")
    }
})
module.exports = knex;
