// For URL Option
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i <hashes.length; i++)
	{
	    hash = hashes[i].split('=');
	    vars.push(hash[0]);
	    vars[hash[0]] = hash[1];
	}
    return vars;
}

// For Enter Key Press to set time.
var isStart = false;
function keySetTime(e){
    if (!e) var e = window.event;

    if(e.keyCode == 13){
	reset();
    }else if(e.keyCode == 32){
	if(isStart == false){
	    start();
	    isStart = true;
	}else{
	    stop();
	    isStart = false;
	}
    }
}

// For Start/Stop Button
function startStop(e){
    $('#startStop').attr('onclick', 'start()');
}

// Stop countdown
var dTime = 2000;
var iTime = 1000;
var oTime = 1000;
function stop() {
    $('#countdown_dashboard').stopCountDown();
    /*
    $.toast({
	    message:"Stop Countdown",
		displayTime:dTime,
		inTime:iTime,
		outTime:oTime
		});
    */
}

// Start countdown
function start() {
    $('#countdown_dashboard').stopCountDown();
    $('#countdown_dashboard').startCountDown();
    $.sound.play("./sound/gong.wav");
    /*
    $.toast({
	    message:"Start Countdown",
		displayTime:dTime,
		inTime:iTime,
		outTime:oTime
		});
    */		
}

// reset and start
function reset() {
    $('#countdown_dashboard').stopCountDown();
    $('#countdown_dashboard').setCountDown({
	    targetOffset: {
		'day': 	0,
		    'month': 	0,
		    'year': 	0,
		    'hour': 	eval($('#hours').val()),
		    'min': 	eval($('#minutes').val()),
		    'sec': 	eval($('#seconds').val())
		    }
	});				
    $('#countdown_dashboard').startCountDown();
    $('#countdown_dashboard').stopCountDown();
    /*
    $.toast({
	    message:"Set Time",
		displayTime:dTime,
		inTime:iTime,
		outTime:oTime
		});
    */
}

// Onmouse Tipsy
$('#stopBtn').tipsy({fallback: 'Stop', gravity: 's'});
$('#startBtn').tipsy({fallback: 'Start', gravity: 's'});
$('#setBtn').tipsy({fallback: 'Set Time', gravity: 's'});

// Form Validation
$('#hours').numeric();
$('#minutes').numeric();
$('#seconds').numeric();

time = (location.search || location.hash).split(/[^0-9]/).filter(
								 function (x) { return x !== ""; }).slice(0, 3).map(function (x) { return parseInt(x, 10); }
	  ).reverse();

	  // Easter Egg Condition
	  var today = new Date();
	  var year = today.getFullYear() + 1;
	  
	  // Set Timer
	  if(time[0] == year && today.getMonth() == 12-1 && today.getDate() == 31){

	  // Easter Egg: Happy New year for this year!!
	  var tid = 0;
	  var newYear = new Date(year,1,1);
	  var today = new Date();
	  var s_time = newYear.getTime() - today.getTime() ;
	  var s_time_obj = new Date();
	  s_time_obj.setTime(s_time);

	  $('#hours').val(s_time_obj.getHours()-9);
	  $('#minutes').val(s_time_obj.getMinutes());
	  $('#seconds').val(s_time_obj.getSeconds());

	  // hide everything except Time.
	  $('#countdown_controls').hide();
	  //$('#hours').hide();
	  //$('#minutes').hide();
	  //$('#seconds').hide();
	  
	  
	  }else{
	    $('#hours').val(time[2] !== undefined ? time[2] : 0);
	    $('#minutes').val(time[1] !== undefined ? time[1] : 0);
	    $('#seconds').val(time[0] !== undefined ? time[0] : 10);
	  }

	  // Set the Countdown
jQuery(document).ready(function() {
	
	$('#countdown_dashboard').countDown({
		targetOffset: {
	        'day': 	0,
	        'month': 	0,
	        'year': 	0,
	        'hour': 	eval($('#hours').val()),
	        'min': 	eval($('#minutes').val()),
	        'sec': 	eval($('#seconds').val())
	      },
	      // onComplete Function
	      onComplete: function() {
	        if(!(time[0] == year && today.getMonth() == 12-1 && today.getDate() == 31)){
	          popup('Finished!');
  	          $.sound.play("./sound/gong3.wav"); 
	        }else{
	          document.location = "http://www.flickr.com/search/show/?q=happy+new+year+"+year+"&ss=0&ct=0&mt=photos&adv=1";
	        }
		    }
	      //onComplete: function() {
	      //$('#complete_info_message').slideDown();
	      //}
	    });
	    if(!(time[0] == year &&
		 today.getMonth() == 12-1 &&
		 today.getDate() == 31)){
		$('#countdown_dashboard').stopCountDown();
	    }

	    if (getUrlVars()["start"] == "on"){
		start();
		//$.sound.play("./sound/gong.wav");
		//$('#countdown_dashboard').startCountDown();
	    }
    });