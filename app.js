function showBottom() {
    var x = document.getElementById("myDIV");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function rescaleTL(cls,scale){


	var tlarray = document.getElementsByClassName(cls);
	console.log(["timelines count: ",tlarray.length]);

	for(i=0; i<tlarray.length; i++){
		var kids = tlarray[i].children;
		var tlEvents = tlarray[i].getElementsByClassName("event");
		var tlDisplay = tlarray[i].getElementsByClassName("tl");

		//for each timeline, get the width and left off set values;
		//start by getting the event numbers
		var yearList = [];
		
		for(ii=0; ii<tlEvents.length; ii++){

			var className = tlEvents[ii].getAttribute("class").split(" ");
			//console.log(["class name: ", className]);

			for(iii=0; iii<className.length; iii++){
				if( className[iii].startsWith("year") ){
					var yearstr = className[iii].replace("year","").replace("bce","-").replace("ce","");
					//console.log(["yearstr: ", yearstr]);
					break;
				}
			}

			var yearPixNum = Math.round( scale * parseFloat(yearstr) );
			yearList.push( yearPixNum);
		}

		//console.log(["tl: ",i,"yearlist: ",yearList]);
		//Now calculate global shift parameters;
		var shiftLeft = Math.min(...yearList);
		var width = Math.max(...yearList)- shiftLeft;

		

		//shift the container
		var ctshift = (-1*shiftLeft).toString()+"px";
		var tlshift = shiftLeft.toString()+"px";

		tlarray[i].style.left = ctshift;//shift container

		for(ii=0; ii<tlDisplay.length; ii++){

			console.log(["initial display left", tlDisplay[ii].getAttribute("style") ]);

			tlDisplay[ii].style.left = tlshift;
			tlDisplay[ii].style.width = width.toString()+"px";

			console.log(["new display left", tlDisplay[ii].getAttribute("style") ]);
		}

		//no rescale the events
		for(ii=0; ii<tlEvents.length; ii++){
			console.log(["applying shift ",tlEvents[ii],yearList[ii]]);
			tlEvents[ii].style.left = yearList[ii].toString()+"px";
		}
	}
}

function rescaleTLEgypt(){
	var scale = parseFloat(document.getElementById("scaletl").value);
	console.log(["rescale egypt",scale, typeof scale]);
	rescaleTL('egyptct',scale);
}