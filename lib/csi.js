/* csi - Client Side Include */

var ns=(typeof(window.ns)=="object"?window.ns:{});
ns.tw=(typeof(ns.tw)=="object"?ns.tw:{});
ns.tw.csi=(typeof(ns.tw.csi)=="object"?ns.tw.csi:{});
ns.tw.csi.glb=(typeof(ns.tw.csi.glb)=="object"?ns.tw.csi.glb:{});
ns.tw.csi.glb.require=[];
ns.tw.csi.glb.inits=[];
ns.tw.csi.glb.includes=1;
ns.tw.csi.glb.basepath="";

ns.tw.csi.include=function(path){
	for(var i=0;i<ns.tw.csi.glb.require.length;i++)
		if(ns.tw.csi.glb.require[i]==path){
			var n=ns.tw.csi.glb.require[i];
			ns.tw.csi.glb.require.splice(i,1);
			ns.tw.csi.glb.require.push(n);
			return;
		}
	
	ns.tw.csi.glb.includes++;
	ns.tw.csi.glb.require.push(path);
	var scr=document.createElement("script");
	scr.setAttribute('type','text/javascript');
	scr.setAttribute('src',ns.tw.csi.glb.basepath+path);
	document.getElementsByTagName("head")[0].appendChild(scr);
}

ns.tw.csi.registerInclude=function(init){
	ns.tw.csi.glb.inits.push(init);
	ns.tw.csi.glb.includes--;
	
	if(!ns.tw.csi.glb.includes){
		for(var i=ns.tw.csi.glb.inits.length-1;i>=0;i--){
			ns.tw.csi.glb.inits[i]();
		}
	}
}

/* nsa - Name Space Allocator */
ns.tw.nsa=(typeof(ns.tw.nsa)=="object"?ns.tw.nsa:{});
ns.tw.nsa.create=function(ns){
	if(typeof(ns)!="string") return {"error":1,"message":"Namespace is not a string"};
	var sub=ns.split(".");
	var current=window;
	for(var i=0;i<sub.length;i++){
		if(typeof(current[sub[i]])!="object") current[sub[i]]={};
		current=current[sub[i]];
	}
	return {"error":0,"message":"OK"};
}