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

		console.log(["tl: ",i,"children: ",kids.length]);
		console.log(["tl: ",i,"events: ",tlEvents.length]);
		console.log(["tl: ",i,"Display Objs: ",tlDisplay.length]);

		//for each timeline, get the width and left off set values;
		//start by getting the event numbers
		var yearList = [];
		
		for(ii=0; ii<tlEvents.length; ii++){

			var className = tlEvents[ii].getAttribute("class").split(" ");
			console.log(["class name: ", className]);

			for(iii=0; iii<className.length; i++){
				if( className[iii].startsWith("year") ){
					var yearstr = className[iii].valu;
					break;
				}
			}
			console.log(["yearstr: ", yearstr]);
			yearList.push(  tlEvents[ii].getAttribute("class")  );
		}

		console.log(["tl: ",i,"yearlist: ",yearList]);

	}
}

function rescaleTLEgypt(){
	var scale;
	rescaleTL('egyptct',scale);
}