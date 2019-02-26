;(function(){

	class userLocation{
		static get(callback){
			if(navigator.geolocation){
				navigator.geolocation.getCurrentPosition((location)=>{
					callback({
						lat: location.coords.latitude,
						lng: location.coords.longitude
					});
				});
			}else{
				alert("No pudimos detectar el lugar en el que te encuentras");
			}

		}
	}

	const my_place = {
					lat: 19.4248097,
					lng: -99.19492559999998
				}

	google.maps.event.addDomListener(window, 'load', ()=>{
		const map = new google.maps.Map(
			document.getElementById('map'),
			{
				center: my_place,
				zoom: 15
			});

	});

	// obtener las coordenadas del usuario
	userLocation.get((coords)=>{
		alert("Ya tengo las coordenadas del usuario");
		console.log(coords);

		//calcular la distancia del restuarante al usuario
		let origen = new google.maps.LatLng(coords.lat, coords.lng); //LatLng
		let destino = new google.maps.LatLng(my_place.lat, my_place.lng);

		let service = new google.maps.DistanceMatrixService();
		service.getDistanceMatrix({
			origins: [origen],
			destinations: [destino],
			travelMode: google.maps.TravelMode.DRIVING
		}, (response, status)=>{
			if(status == google.maps.DistanceMatrixStatus.OK){
				const duration_element = response.rows[0].elements[0];
				console.log(duration_element);

				//imprimimos la duracion
				const duracion_viaje = duration_element.duration.text;
				document.querySelector("#message")
				        .innerHTML = `Estás a ${duracion_viaje} de una
				            noche inolvidable en <span class="dancing-script medium">
				            RestauranteFacilito</span>`
			}
		});


		//colocar el marcador en el mapa
		const marker = new google.maps.Marker({
			map: map,
			position: my_place,
			title: "RestauranteFacilito",
			visible: true
		});

	});

})()