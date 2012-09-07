if ( process.argv.length < 5 ){
	console.log('Example : node test.js /var/node/opencv/img/img_test.png 1 1');
	console.log('Example images :');
	console.log('        : /var/node/opencv/img/img_test.png');
	console.log('        : /var/node/opencv/img/img_test1.jpg');
	console.log('        : /var/node/opencv/img/img_test2.jpg');
	return;
}

var bitmapFilePath = process.argv[2],
	x			   = process.argv[3]|0,
	y			   = process.argv[4]|0;

require('./magicWand.js').magicWand(bitmapFilePath,{x:x,y:y},function(aErr,aPathes){
	if ( !aErr && aPathes ){
		console.log(aPathes.length+' pathes found');
		var i=0,str='';aPathes.forEach(function(path){
			console.log('    path '+(++i)+' has '+path.length+' points');
			str+='\r\n path '+i+' > \r\n'
			path.forEach(function(p){
				str+=p.x+','+p.y+';'
			});
			str+='\r\n'
		});
		console.log(str)
	} else {
		console.log('Error ...\r\n',aErr);
	}
});
