function evenQ(number){
    return (number % 2) === 0;
}

function createTimeline(className,yearArray,descriptionArray){
	
	if(yearArray.length != descriptionArray.length){
		alert("year array and descriptionArray are different lengths abortin...");
		return;
	}

	//first, get tlSection and new conatiner for out time line
	var tlSection = document.getElementById("timelinesection");
	var newTLContainer = document.createElement("div");

	//configure container
	newTLContainer.classList.add("tlct");
	newTLContainer.classList.add(className+"ct");

	//now create tl display and add to container
	var tlbkgrd = document.createElement("div");
	tlbkgrd.classList.add("tl");
	tlbkgrd.classList.add("bkgrd");
	tlbkgrd.classList.add(className);

	var tlBar = document.createElement("div");
	tlBar.classList.add("tl");
	tlBar.classList.add("bar");
	tlBar.classList.add(className);

	//add the bar to container
	newTLContainer.appendChild(tlbkgrd);
	newTLContainer.appendChild(tlBar);


	//now create tl events
	for(i=0; i<yearArray.length; i++){

		var newEvent = document.createElement("div");
		newEvent.classList.add("event");

		var yearStandard = ToYearSTR(yearArray[i]);
		newEvent.classList.add(yearStandard);

		//now add detail container
		var newDetail = document.createElement("div");
		newDetail.classList.add("detailcontainer");

		//now add  header
		var eventHeader = document.createElement("h3");
   		var header = document.createTextNode(yearArray[i].toString());
		eventHeader.appendChild(header);

		//now add text
		var eventTxt = document.createElement("p");
   		var txt = document.createTextNode(descriptionArray[i]);
   		eventTxt.appendChild(txt);

   		newDetail.appendChild(eventHeader);
   		newDetail.appendChild(eventTxt);

		if(evenQ(i)){
			newDetail.classList.add("top");
		}else{
			newDetail.classList.add("bottom");
		}

		newEvent.appendChild(newDetail);		

		newTLContainer.appendChild(newEvent);

		//now we deend to be able to apply all positions to the global container
	}

	//finally end by appending our new timeline container into timeline section
	tlSection.appendChild(newTLContainer);

	rescaleTL(className+"ct" ,1.0);
}




//var node = document.getElementById('node-id');
//var newNode = document.createElement('p');
//newNode.appendChild(document.createTextNode('some dynamic html'));
//node.appendChild(newNode);

function ToYearSTR(year){
	var yearstr = year.toString();
	if( yearstr.startsWith("-") ){
		yearstr = yearstr.replace("-","bce");
	}else{
		yearstr = "ce"+yearstr;
	}

	return "year"+yearstr;
}


function classNameToYear(className){
	var nameArray = className.split(" ");
	//console.log(["classNameToYear: yearstr: ", yearstr]);
	for(iii=0; iii<nameArray.length; iii++){
		if( nameArray[iii].startsWith("year") ){
			var yearstr = nameArray[iii].replace("year","").replace("bce","-").replace("ce","");
			break;
		}
	}
	console.log(["classNameToYear: yearstr: ", yearstr]);
	return parseFloat(yearstr);

}


//Shift container to center aroun 0 and
function rescaleTL(cls,scale){


	var tlarray = document.getElementsByClassName(cls);
	console.log(["timelines count: ",tlarray.length]);

	for(i=0; i<tlarray.length; i++){


		var tlEvents = tlarray[i].getElementsByClassName("event");
		var tlDisplay = tlarray[i].getElementsByClassName("tl");

		//for each timeline, get the width and left off set values;
		//start by getting the event numbers
		var yearList = [];		
		for(ii=0; ii<tlEvents.length; ii++){
			var yearNum = classNameToYear( tlEvents[ii].getAttribute("class")) ;
			var yearPixNum = Math.round( scale * yearNum );
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
			//console.log(["initial display left", tlDisplay[ii].getAttribute("style") ]);
			tlDisplay[ii].style.left = tlshift;
			tlDisplay[ii].style.width = width.toString()+"px";
			//console.log(["new display left", tlDisplay[ii].getAttribute("style") ]);
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
	//console.log(["rescale egypt",scale, typeof scale]);
	rescaleTL('egyptct',scale);
}