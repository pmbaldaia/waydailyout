 let map, infoWindow;
 function initMap() {
   map = new google.maps.Map(document.getElementById('mapper'), {
     center: {lat: -34.397, lng: 150.644},
     zoom: 18,
     mapTypeId: "satellite"
   });
   
    infoWindow = new google.maps.InfoWindow;

   // Try HTML5 geolocation
   if (navigator.geolocation) {
       
       // returns the current position of the user 
       // USE wathPosition to continue to return the updated position as you move (like GPS in a car)
       navigator.geolocation.getCurrentPosition(
           position => {
               const pos = { lat: position.coords.latitude, lng: position.coords.longitude };
               infoWindow.setPosition(pos);
               infoWindow.setContent('Está aqui');
               infoWindow.open(map);
               map.setCenter(pos);
           }, 
           () => handleLocationError(true, infoWindow, map.getCenter())
       );
   } else {
     // Browser doesn't support Geolocation
     handleLocationError(false, infoWindow, map.getCenter());
   }
 }

 function handleLocationError(browserHasGeolocation, infoWindow, pos) {
   infoWindow.setPosition(pos);
   infoWindow.setContent(browserHasGeolocation ?
                         'Error: The Geolocation service failed.' :
                         'Error: Your browser doesn\'t support geolocation.');
   infoWindow.open(map);
 }

 function adminPage(){
  window.location='./html/admin.html';
}

function userPage(){
  window.location='./html/profile.html';
}

function dashboard(){
  window.location='../index.html'
}


document.getElementById('userWelcome').innerHTML = sessionStorage.getItem('loggedUser');

var name = document.getElementById("txtUsername");
                       document.getElementById("iniciar").addEventListener("click", function () { 
                       alert('Olá ' + txtUsername.value + " " + '!');
                   })