	var $ = function (id){
		return document.getElementById(id);
	}
	var btn = document.getElementsByTagName('button')[0];
	if(btn.attachEvent){
		btn.attachEvent("onclick",click)
	}
	else{
		none.addEventListener("click",clikc,false)
	}
	function click(){
		var val = $("aqi-input").value;
		if(val > 0){
			$("api-display").innerHTML = val;
		}else{
			$("api-display").textContent = val;
		})
		else{
			alert("Please complete the form|");
		}

	}