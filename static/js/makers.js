var JSON_URL="http://localhost:5000/makers";
var map;
var cars=[];
var movs5=0;

function movs(){
	if (movs5==0){
		movs5=1;
		console.log('modo 5 activado');
	}
	else{
		console.log('modo 5 desactivado');
		movs5=0;
	}
}
class pos{
	constructor(lat,lon){
		this.lat=lat;
		this.long=lon;
	}
}

class car{
	constructor(id,lat,lon){
		this.id=id;
		this.pos=[];
		var p=new pos(lat,lon);
		this.pos[0]=p;
		this.markers=[];

		this.markers[0]==new google.maps.Marker({
			position: myLatLng,
			map: null,
			title: this.name
		});
		this.markers[1]==new google.maps.Marker({
			position: myLatLng,
			map: null,
			title: this.name
		});
		this.markers[2]==new google.maps.Marker({
			position: myLatLng,
			map: null,
			title: this.name
		});
		this.markers[3]==new google.maps.Marker({
			position: myLatLng,
			map: null,
			title: this.name
		});
		this.markers[4]==new google.maps.Marker({
			position: myLatLng,
			map: null,
			title: this.name
		});

		var contentString = '<div id="content">'+
		      '<div id="siteNotice">'+
		      '</div>'+
		      '<h1 id="firstHeading" class="firstHeading">'+this.id+'</h1>'+
		      '<div id="bodyContent">'+
		      '<p>Position: Lat: '+this.pos[this.pos.length - 1].lat+'  Long: '+this.pos[this.pos.length - 1].long+
		      '</div>'+
		      '</div>';

		  var infowindow = new google.maps.InfoWindow({
		    content: contentString
		  });


		var myLatLng = {lat:lat, lng:lon};
		this.mark=new google.maps.Marker({
			position: myLatLng,
			map: map,
			title: this.name
		});
		this.mark.addListener('click', function() {
		    infowindow.open(map, this.mark);
		  });
		
	}

	get_marker(){
		var myLatLng = {lat:this.pos[this.pos.length - 1].lat, lng:this.pos[this.pos.length - 1].long};
		console.log('nueva posicion '+this.pos[this.pos.length - 1].lat+' '+this.pos[this.pos.length - 1].long);
		this.mark.setPosition(new google.maps.LatLng( this.pos[this.pos.length - 1].lat, this.pos[this.pos.length - 1].long ));
		this.mark.setMap(null);
		this.mark.setMap(map);
	}

	get_five_markers(){
		var y=0;
		if (y>this.pos.length){
			y=this.pos.length;
		}
		console.log(this.pos.length - y);
		console.log(this.pos[this.pos.length - y].lat);
		var myLatLng = {lat:this.pos[this.pos.length - y].lat, lng:this.pos[this.pos.length - 1].long};
		console.log('nueva posicion '+this.pos[this.pos.length - 1].lat+' '+this.pos[this.pos.length - 1].long);
		this.markers[0].setPosition(new google.maps.LatLng( this.pos[this.pos.length - 1].lat, this.pos[this.pos.length - 1].long ));
		this.markers[0].setMap(null);
		this.markers[0].setMap(map);
		y++;
		if (y>this.pos.length){
			y=this.pos.length;
		}
		var myLatLng = {lat:this.pos[this.pos.length - y].lat, lng:this.pos[this.pos.length - 1].long};
		console.log('nueva posicion '+this.pos[this.pos.length - 1].lat+' '+this.pos[this.pos.length - 1].long);
		this.markers[1].setPosition(new google.maps.LatLng( this.pos[this.pos.length - 1].lat, this.pos[this.pos.length - 1].long ));
		this.markers[1].setMap(null);
		this.markers[1].setMap(map);
		y++;
		if (y>this.pos.length){
			y=this.pos.length;
		}
		var myLatLng = {lat:this.pos[this.pos.length - y].lat, lng:this.pos[this.pos.length - 1].long};
		console.log('nueva posicion '+this.pos[this.pos.length - 1].lat+' '+this.pos[this.pos.length - 1].long);
		this.markers[2].setPosition(new google.maps.LatLng( this.pos[this.pos.length - 1].lat, this.pos[this.pos.length - 1].long ));
		this.markers[2].setMap(null);
		this.markers[2].setMap(map);
		y++;
		if (y>this.pos.length){
			y=this.pos.length;
		}
		var myLatLng = {lat:this.pos[this.pos.length - y].lat, lng:this.pos[this.pos.length - 1].long};
		console.log('nueva posicion '+this.pos[this.pos.length - 1].lat+' '+this.pos[this.pos.length - 1].long);
		this.markers[3].setPosition(new google.maps.LatLng( this.pos[this.pos.length - 1].lat, this.pos[this.pos.length - 1].long ));
		this.markers[3].setMap(null);
		this.markers[3].setMap(map);
		y++;
		if (y>this.pos.length){
			y=this.pos.length;
		}
		var myLatLng = {lat:this.pos[this.pos.length - y].lat, lng:this.pos[this.pos.length - 1].long};
		console.log('nueva posicion '+this.pos[this.pos.length - 1].lat+' '+this.pos[this.pos.length - 1].long);
		this.markers[4].setPosition(new google.maps.LatLng( this.pos[this.pos.length - 1].lat, this.pos[this.pos.length - 1].long ));
		this.markers[4].setMap(null);
		this.markers[4].setMap(map);
	}

}


function init(){
	map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: 42.101771494, lng: -8.614983186},
	  zoom: 17
	});
	poll();
	
}
function poll(){
	$.ajax({
	    url: JSON_URL, // JSON_URL is a global variable
	    dataType: 'text',
	    error: function(xhr_data) {
	      console.log("xhr_data");
	    },
	    success: function(xhr_data) {
	      if (xhr_data.status == 'pending') {
	        setTimeout(function() { ajax_request(); }, 5000);
	      } else {
			console.log(xhr_data);
	        initMap(xhr_data);
			sleep(5000);
	      }
	    },
	    contentType: 'application/json'
	  });
	setTimeout("poll()",5000);
}


function detectBrowser() {
  var useragent = navigator.userAgent;
  var mapdiv = document.getElementById("map");

  if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {
    mapdiv.style.width = '100%';
    mapdiv.style.height = '100%';
  } else {
    mapdiv.style.width = '600px';
    mapdiv.style.height = '800px';
  }
}


function initMap(json) {
	
	console.log("initMap");
	txt2=json;
	txt2=txt2.split("\'").join('"');
	var obj = jQuery.parseJSON(txt2);
	var y=0;
	obj.forEach(function (item, index, array) {
		var bol=0;
		console.log("for each de json");
		console.log(item.Id);
		cars.forEach(function (item2, index2, array2) {
			console.log("for each de cars");
			if (item.Id==item2.id){
				console.log("coincide");
				var p = new pos(parseFloat(item.lat),parseFloat(item.long));
				if (item2.pos[item2.pos.length-1].lat!=p.lat || item2.pos[item2.pos.length-1].long!=p.long){
					item2.pos.push(p);	
				}
				bol=1;
			}
		});
		if (bol==0){
			console.log("nuevo coche");
			var c =new car(item.Id,parseFloat(item.lat),parseFloat(item.long));

			cars.push(c);
		}
		bol=0;
		console.log(cars);
		cars.forEach(function (it, index2, array2) {
			console.log('nueva marca '+it.Id);
			if (movs5==1){
				console.log('five');
				it.get_five_markers();
			}
			else {
				console.log('normal');
				it.get_marker();	
			}
		});
	});
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

