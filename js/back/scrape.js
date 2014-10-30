
var http = require('http');
var htmlParser = require('html-parser');
var newsList = require('./newslist').newsList;

function Scrape(){
	this.news = new Object();
}

Scrape.prototype.startScrape=function(){
	for(var i=0;i<newsList.length;i++){
		var site = newsList[i].site;
		var nome = this.news[newsList[i].nome];
		var xmlText = "";
		var prova = this.parseXml;
		http.get(site, function(res){
			console.log(res.statusCode);
			res.setEncoding('utf8');
			res.on('data', function(chunk){						// nell'handler fare il for e poi ritornare la
				xmlText+=chunk;									// lista notizie ogni volta
			});
			res.on('end', function(){
				var notizie=prova(xmlText);
				nome=notizie;
				console.log(nome);
			});
		});
	}
}
Scrape.prototype.parseXml=function(xmlT){
	var ctrlTitle = false;
	var ctrlItem = false;
	var ctrlLink = false;
	var oneNews = new Object();
	var notizie = new Array();
	htmlParser.parse(xmlT, {openElement:function(name){
		if(name=='title'){
			if(ctrlItem){ctrlTitle = true;}
		}
		else if(name=='item'){ctrlItem = true;}
		else if(name=='link'){
			if(ctrlItem){ctrlLink=true;}
		}
	},text:function(value){
		if(ctrlTitle){
			ctrlTitle = false;
			oneNews['title']=value;
		}
		else if(ctrlLink){
			ctrlLink = false;
			oneNews['link']=value;
			notizie.push(oneNews);
			oneNews={};
		}
	}});
	console.log(notizie);
	return notizie;
}

var scr = new Scrape();
var not = scr.startScrape();

exports.Scrape = Scrape;
