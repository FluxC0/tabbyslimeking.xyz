/* evening - Event Handling */
if(!ns || !ns.tw || !ns.tw.csi) alert("CSI - Client Side Include has not been loaded.");

ns.tw.nsa.create("ns.tw.evening");

ns.tw.evening.addEventListener=function(obj,type,callback){
	if(obj.addEventListener!=undefined) obj.addEventListener(type,callback,false);
	else if(obj.attachEvent!=undefined) obj.attachEvent("on"+type,callback);
	else{
		var o=obj["on"+type];
		obj["on"+type]=(o?function(evt){o(evt);callback(evt);}:callback);
	}
}
			
ns.tw.csi.registerInclude(function(){});