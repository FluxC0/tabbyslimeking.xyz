/* ja - Javascript Assistant */
if(!ns || !ns.tw || !ns.tw.csi) alert("CSI - Client Side Include has not been loaded.");

	ns.tw.nsa.create("ns.tw.ja");
	
	ns.tw.ja.extend = function(child, parent) {
		var blank=function() {};
		blank.prototype = parent.prototype;
		
		child.prototype = new blank();
		child.prototype.constructor = child;
		child.baseConstructor = parent;
		child.superClass = parent.prototype;
	}

	ns.tw.ja.scope = function(fc,sc){
		var p=[];
		for(var i=2;i<arguments.length;i++) p.push(arguments[i]);
			
		if(sc) return (function(){fc.call(sc,this,p);});
		else return (function(){fc(this,p);});
	}
	
	ns.tw.ja.asap=function(fc,sc){
		var p=[];
		for(var i=2;i<arguments.length;i++) p.push(arguments[i]);
		window.setTimeout(ns.tw.ja.scope(fc,sc,p),0);
	}

	ns.tw.ja.encapsulate=function(fc,data){
		return (function(){fc(data,arguments);});
	}
	
	ns.tw.ja.tween=function(callback,numsteps, delay, se){
		var animdata={};
		animdata.steps=[];
		animdata.vals=[];
		animdata.endvals=[];
		animdata.rsteps=numsteps;
		animdata.delay=delay;
		animdata.callback=callback;

		for(var i=0;i<se.length;i++){
			animdata.steps.push((se[i][1]-se[i][0])/numsteps);
			animdata.vals.push(se[i][0]);
			animdata.endvals.push(se[i][1]);
		}
		
		var loop=null;
		loop=function(data,arguments){
			if(!data.rsteps) data.callback(data.endvals,true);
			else{
				data.callback(data.vals,false);
				for(var i=0;i<data.vals.length;i++) data.vals[i]+=data.steps[i];
				data.rsteps--;
				window.setTimeout(ns.tw.ja.encapsulate(function(d,a){ loop(d,a);} ,data),data.delay);
			}
		}
		
		loop(animdata);
	}
	
	ns.tw.ja.timetween=function(callback,totaltime, se){
		var animdata={};
		animdata.totaltime=totaltime;
		animdata.callback=callback;
		
		animdata.startvals=[];
		animdata.range=[];
		animdata.endvals=[];

		for(var i=0;i<se.length;i++){
			animdata.startvals.push(se[i][0]);
			animdata.range.push(se[i][1]-se[i][0]);
			animdata.endvals.push(se[i][1]);
		}
		
		var loop=null;
		loop=function(data,arguments){
			if(data.time>=data.totaltime) data.callback(data.endvals,true);
			else{
				var vals=[];
				var p=data.time/data.totaltime;
				for(var i=0;i<data.startvals.length;i++)
					vals.push(data.startvals[i]+data.range[i]*p);

				data.callback(vals,false);
				data.time=(new Date()).getTime()-data.start;
				window.setTimeout(ns.tw.ja.encapsulate(function(d,a){ loop(d,a);} ,data),0);
			}
			
		}
		animdata.start=(new Date()).getTime();
		animdata.time=0;
		loop(animdata);
	}

ns.tw.csi.registerInclude(function(){});



			

			

			

			

			
