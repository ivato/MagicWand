# Magic wand

**Snippet to have an image selection tool ( magic wand ) into node.js.**

### Dependencies
OpenCV and Python must be installed.

### How does it work
Simply Launches a python process and sends it a script, formatted with image file path, magic wand position, and threshold values.
callback receives the list of the pathes.

	require('./magicWand').magicWand(bitmapPath,params,function(err,result){
		// ...
	});
	
	Params argument is an object that must have at least x and y values.
	Optionnaly can include chainApprox and threshold values ( see comments in code )
	
	Callback result argument is an array containing one array - ore more - of points, each array being a path. Points are simple {x,y} objects. 
	
	
Files :
    
    test.js
    node test.js bitmapfile x y

    magicWand.js
    Formats, lauches and listen to the python process

    magicWand.tpl
    Basic template of the python script.


[Original python script here](https://code.ros.org/trac/opencv/browser/trunk/opencv/samples/python2/floodfill.py?rev=6080)