/* domina - DOM Integration Assistant */
if(!ns || !ns.tw || !ns.tw.csi) alert("CSI - Client Side Include has not been loaded.");

ns.tw.nsa.create("ns.tw.domina");

ns.tw.domina.byId=function(id){
	return document.getElementById(id);
}

ns.tw.domina.byName=function(name,base){
	return (base?base:document).getElementsByName(name);
}

ns.tw.domina.byClass=function(name,base,tag) {
	if(tag){
		var cloud = (base?base:document).getElementsByTagName(tag);
		var res = [];
		for(var i=0; i<cloud.length; i++) if(cloud[i].className == name) res.push(cloud[i]);
		return res;
	}else{
		var node=(base?base:document);
		var res=[];
		
		if(node.className && node.className==name) res.push(node);
		
		var checkLevel=null;
		checkLevel=function(n){
			for(var i=0;i<n.childNodes.length;i++){
				if(n.childNodes[i].className && n.childNodes[i].className==name) res.push(n.childNodes[i]);
				if(n.childNodes[i].childNodes.length>0) checkLevel(n.childNodes[i]);
			}
		}
		
		checkLevel(node);
		return res;
	}
}

ns.tw.domina.setOpacity=function(el,percentage){
	if(el.style.filter!=undefined){
		el.style.filter="Alpha(opacity='"+Math.floor(percentage)+"')";
	}
	else el.style.opacity=percentage/100;
}

ns.tw.domina.make=function(tagname){
	return document.createElement(tagname);
}

ns.tw.domina.getInnerDimension=function(){
	var base=null;
	var compat=false;
	if(document.compatMode=='BackCompat' || !document.compatMode || !document.documentElement) compat=true;
	
	base=(compat?document.body:document.documentElement);
	
	var r={"x":base.clientWidth,"y":base.clientHeight,"u":base.scrollLeft,"v":base.scrollTop};
	if(window.innerWidth){
		var w=window.innerWidth;
		var h=window.innerHeight;
		if(Math.abs(r.x-w)>20) r.x=w;
		if(Math.abs(r.y-h)>20) r.y=h;
	}
	
	return r;
}


ns.tw.csi.include("lib/evening.js");

ns.tw.domina.class_screenDiv=function(left,top,right,bottom,leftispercent,topispercent,rightispercent,bottomispercent){
	this.node=ns.tw.domina.make("div");
	this.topLeft={};
	this.topLeft.x={"coord":left,"unit":(leftispercent?"%":"px")};
	this.topLeft.y={"coord":top,"unit":(topispercent?"%":"px")};
	this.bottomRight={};
	this.bottomRight.x={"coord":right,"unit":(rightispercent?"%":"px")};
	this.bottomRight.y={"coord":bottom,"unit":(bottomispercent?"%":"px")};
	this.node.style.position="fixed";
	this.fixed=true;
	document.body.appendChild(this.node);
	if(!window.innerWidth){
		this.fixed=false;
		this.node.style.position="absolute";
		ns.tw.evening.addEventListener(window,"scroll",ns.tw.ja.scope(this.update,this));
	}
	this.update();
	
	
	
	ns.tw.evening.addEventListener(window,"resize",ns.tw.ja.scope(this.update,this));
}

ns.tw.domina.class_screenDiv.prototype.update=function(){
	
	var dim=ns.tw.domina.getInnerDimension();
	
	var x0=0;var y0=0;
	var x1=0;var y1=0;
	if(this.topLeft.x.unit=="%") x0=Math.floor(dim.x/100*this.topLeft.x.coord); else x0=this.topLeft.x.coord;
	if(this.topLeft.y.unit=="%") y0=Math.floor(dim.y/100*this.topLeft.y.coord); else y0=this.topLeft.y.coord;
	if(this.bottomRight.x.unit=="%") x1=Math.floor(dim.x/100*this.bottomRight.x.coord); else x1=this.bottomRight.x.coord;
	if(this.bottomRight.y.unit=="%") y1=Math.floor(dim.y/100*this.bottomRight.y.coord); else y1=this.bottomRight.y.coord;
	
	var scrollx=0;
	var scrolly=0;
	if(!this.fixed){
		scrollx=dim.u;
		scrolly=dim.v;
	}
	
	
	this.node.style.left=(x0+scrollx)+"px";
	this.node.style.top=(y0+scrolly)+"px";
	if(!(this.bottomRight.x.coord===false)) this.node.style.width=(dim.x-x0-x1)+"px";
	if(!(this.bottomRight.y.coord===false)) this.node.style.height=(dim.y-y0-y1)+"px";
}
	
ns.tw.csi.registerInclude(function(){

});