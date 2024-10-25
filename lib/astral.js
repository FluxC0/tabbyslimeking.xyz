/* astrol - A String Assistance Library */
if(!ns || !ns.tw || !ns.tw.csi) alert("CSI - Client Side Include has not been loaded.");

ns.tw.nsa.create("ns.tw.astral");

ns.tw.astral.has = function(haystack, needle){
	return(haystack.indexOf(needle)!=-1);
}

ns.tw.astral.which = function(haystack,needlesArray){
	var found=-1;
	for(var i=0;i<needlesArray.length;i++){
		if(ns.tw.astral.has(haystack,needlesArray[i])) found=(i);
	}
	return found;
}

ns.tw.csi.registerInclude(function(){});