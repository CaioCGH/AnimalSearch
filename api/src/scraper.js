var express = require('express');
var request = require('request');
var cheerio = require('cheerio');

exports.scrapeWikiavesName = (wikiavesCode) =>{
    const url = "https://www.wikiaves.com.br/wiki/" + wikiavesCode;
    console.log(url);
    return new Promise((resolve, reject)=>{
        request(url, (err, resp, body) =>{
            if(err){
                reject(error);
            }
            let $ = cheerio.load(body);
            let $url = url;
            var $taxonomy2 = $("#taxonomia").text();
            var $taxonomy = {};
            var table = [];
            $("td").each((index, element) => {
                table.push($(element).text());
              });;
            for(var i = 0; i < table.length - 1; i=i+2){
                // if(table[i] === ''){
                //     $taxonomy[table[i]] = table[i+1];    
                // }
                $taxonomy[table[i]] = table[i+1];
            }


            let $mainImg = $('.wa-capa').attr("src");
            let $ocurrencesMap = $('img[title="Ocorrências registradas no WikiAves"]').attr("src");
    
            var result = {
                url: $url,
                taxonomy: $taxonomy,
                mainImg: $mainImg,
                ocurrencesMap: $ocurrencesMap,
            }
            resolve(result);
        })
    })
}