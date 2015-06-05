$(document).ready( function(){
	var arrCurrentBtns = []; //array to hold alpha button objects that have been clicked for this go-round...
	var strNoneYet = "None yet...";//Populate the selected numbers list with this string, initially
	$('#numDisplaySpan').text(strNoneYet);
	var numPerCombo = 3;//Default number of letters in each combo. User can select a value 1-9

	$('select').val(numPerCombo);

	$('.button').click(function(){
		if($(this).find('.alphaSmall').length > 0){//if it's a button with alpha chars
			var thisBtnNum = $(this).find('.btnText').text().charAt(0);
			var arrCheckCurrent = $.grep(arrCurrentBtns, function(obj){return obj.find('.btnText').text().charAt(0) == thisBtnNum;});
			/*
			* Above -- see if the button has already been clicked for this round. $.inArray() doesn't work when checking an array for existence of objects,
			* So using $.grep() instead --which will return an array of objects in currentBtns that satisfy the filter function.
			* Looking for a button in arrCurrentBtns that has the same number.
			*/

			if (arrCheckCurrent.length == 0) {//if the button clicked isn't in the array already
				arrCurrentBtns.push($(this));//then add it to the array and display its number in the list
				var isFirstNum = $('#numDisplaySpan').text().length == 0 || $('#numDisplaySpan').text() == strNoneYet;
				var comma = ", ";
				if (isFirstNum) {
					comma = "";
					$('#numDisplaySpan').text('');//clear the number display of strNoneYet
				}
				$('#numDisplaySpan').append(comma + thisBtnNum);
			}
		}
		else {//It's a button with no alpha chars. Do nothing if it's the 1 or 0 button. Handle reset or enter button.
			if ($(this).find('.btnText').attr('id') == "reset"){
				reset();
			}
			else if($(this).find('.btnText').attr('id') == "enter"){
				doCombos();
			}
		}
	});

	var reset = function() {
		arrCurrentBtns = [];
		$('#numDisplaySpan').text(strNoneYet);
		$('select').val(numPerCombo);
		$('#showCombosDiv').html("");
	};
	
	var doCombos = function (){//function to generate and display combos 
		var arrCurrentLetters = getCurrentLetters();//create a non-repeating array of the selected buttons' letters
		var r = ($('select').val() > arrCurrentLetters.length) ? arrCurrentLetters.length : $('select').val();
		/*
		* r is the number of letters per combo. If it's larger than the number of letters to choose from,
		* set it to be equal. This way 1 combo will still be generated. 
		*/ 
		var arrCombos = [];
		if (r == 1) {//if r is 1, want to see all the letters chosen as individual, 1-letter combos. 
			for (var i=0; i<arrCurrentLetters.length; i++) {
				arrCombos.push([arrCurrentLetters[i]]);//To do this, make each letter an array inside arrCombos, so join() below will still work
			}
		}
		else {
			arrCombos = getCombinations(arrCurrentLetters, r);//otherwise, let the recursive function do its thing
		}
		var numCombos = arrCombos.length;

		//display combos to user
		$('#showCombosDiv').html("");//clear any previous results
		$('#showCombosDiv').append("Total Combinations: " + numCombos + "<br/>");
		for (var i=0; i<numCombos; i++) {//can't use $.each() here - jQuery changes the elements from arrays to objects
			$('#showCombosDiv').append("<div class='comboDiv'>" + arrCombos[i].join("") + "</div>");
		}
		$('#showCombosDiv').append("<br class='clear' />");
	};

	var getCurrentLetters = function(){//function to create a non-repeating array of the selected buttons' letters
		var arrLetters = [];
		var tempString = ''; 
		var stringLength = 0;
			
		$.each(arrCurrentBtns, function(){
			tempString = $(this).find('.alphaSmall').text();
			stringLength = tempString.length;
			for (var i=0; i<stringLength; i++) {
				if ($.inArray(arrLetters, tempString.charAt(i)) == -1){//Make sure the letter isn't in the array already.
					//Won't happen, because no button is repeated in arrCurrentBtns, but if this were a production app that could potentially change at some point... 
					arrLetters.push(tempString.charAt(i));
				}
			}
		});
		return arrLetters.sort();//sort the letters alphabetically, so combos of same letters will always show in same order
	};

	var factorial = function(x) {//recursive function to get x!
	    if(x == 0) {
	        return 1;
	    } else {
	        return x * factorial(x - 1);
	    }
	};

	var getCombinations = function(arrLetters, r){//recursive function to get all non-repeating combos of r letters from the pool of selected letters 
	    //var i;
	    var subI;
	    var ret = [];
	    var sub;
	    var next;
	    for(var i=0; i<arrLetters.length; i++){
	        if(r === 1){
	           ret.push([ arrLetters[i]]);
	        }else{
	            sub = getCombinations(arrLetters.slice(i+1, arrLetters.length), r-1);
	            for(subI = 0; subI < sub.length; subI++ ){
	                next = sub[subI];
	                next.unshift(arrLetters[i]);
	                ret.push(next);
	           }
	        }
	    }
	    return ret;
	};
	
	$(".returnBtn").bind("click", function() {
		window.location = "../index.cfm";
	});
});