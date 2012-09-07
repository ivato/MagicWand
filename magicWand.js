var mwTemplate		= false,
	cache			= [];

require('fs').readFile(__dirname+'/magicWand.tpl','utf8',function(aErr,aResult){
	mwTemplate = aResult;
	var shiftQueue = function(){
		if ( cache.length ){
			// Better to trigger one request after the other.
			var c = cache.shift();
			module.exports.magicWand(c.bitmapPath,c.params,function(aErr,aResult){
				c.callback(aErr,aResult);
				shiftQueue();
			});
		};
	};
	shiftQueue();
});

/*
	chainApprox tells how pathes should be simplyfied. CHAIN_APPROX_TC89_L1 is used if not specified. 
	CHAIN_APPROX_NONE,
	CHAIN_APPROX_SIMPLE,
	CHAIN_APPROX_TC89_L1, 
	CHAIN_APPROX_TC89_KCOS
*/

module.exports.magicWand = function(aBitmapPath,aParams,aCallback){

	if ( !mwTemplate ){
		// Until template is loaded, we store the requests in a queue. Template readFile()'s callback will process the queue until it is empty.
		cache.push({bitmapPath:aBitmapPath,params:aParams,callback:aCallback});
		return;
	} else if ( aParams.x === undefined || aParams.y === undefined ){
		aCallback(new Error('Params argument missing x and/or y values.'),false);
		return;
	} else {
		// To do : use a template engine.
		var	pythonScript = mwTemplate
							.replace('{{bitmapPath}}','\''+aBitmapPath+'\'')
							.replace('{{sp}}','max(0,min(w,'+aParams.x+')), max(0,min(h,'+aParams.y+'))')
							.replace('{{thresholdLow}}',aParams.thresholdLow|0)
							.replace('{{thresholdHigh}}',aParams.thresholdHigh|0)
							.replace('{{chainApprox}}',aParams.chainApprox||'CHAIN_APPROX_TC89_L1'),
			python = require('child_process').spawn('python'),
			result = '';

		// Listen to errors and standard output
		python.stderr.on('data', function (aData) {
			aCallback(aData.toString("utf8"),false);
			python.stdout.removeAllListeners();
			python.stderr.removeAllListeners();
		});
		python.stdout.on('data', function (aData) {
			result += aData.toString("utf8");
		});
		python.stdout.once('end', function () {
			if ( result.length > 0 ) {
				aCallback(false,JSON.parse(result));
			} else {
				aCallback(true,false);
			};
		});
		// input the script
		python.stdin.end(pythonScript);
	};
};
