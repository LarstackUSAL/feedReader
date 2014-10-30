var requestHandler = require('./requestHandler');

var urlList = {
	'/':requestHandler.home;
	'/home':requestHandler.home;
}

function route(pathName, res){
	if(typeof urlList[pathName]=='function'){
		console.log("Routing for "+pathName);
		urlList[pathName](res);
	}else{
		console.log(pathName+" not found.");
		requestHandler.notFound(res);
	}
}

exports.route = route;