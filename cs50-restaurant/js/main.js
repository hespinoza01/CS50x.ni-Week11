
;(function(){
	let sticky = false;
	unStickNavigation(); //$('stickNavigation').slideUp(0);

	$(window).scroll(function(){
		const inBottom = isInBottom();

		if(inBottom && !sticky){
			//cambiar la navegación 
			console.log("cambiar la navegación");
			sticky = true;
			stickNavigation();
		}

		if(!inBottom && sticky){
			sticky = false;
			unStickNavigation();
			console.log("regresar la navegación");
		}
	});

	function isInBottom(){
		const $description = $("#description");
		const descriptionHeight = $description.height();

		return $(window).scrollTop() > $(window).height()-(descriptionHeight * 2);
	}

	function stickNavigation(){
		$('#description').addClass('fixed').removeClass('absolute').removeClass('bottom').addClass('topposs');
		$('#navigation').slideUp("fast");//addClass('hidden');
		$('#stickyNavigation').slideDown("fast");//removeClass('hidden');
	}

	function unStickNavigation(){
		$('#description').removeClass('fixed').addClass('absolute').addClass('bottom').removeClass('topposs');
		$('#navigation').slideDown("fast");//removeClass('hidden');
		$('#stickyNavigation').slideUp("fast");//addClass('hidden');
	}

	// temporizador para implementar el slider
	let currentPosition = 0;
	const imageCounter = $("[data-name='image-counter']").attr("content");
	setInterval(()=>{
		if(currentPosition < (imageCounter-1))
			currentPosition++;
		else
			currentPosition = 0;

		$('#galeria .inner').css({
			left: "-"+(currentPosition*100)+"%"
		});
	},4000);

	// Función para enviar los datos del formulario al correo estipulado
	$("#contact-form").on("submit", function(ev){
		ev.preventDefault();

		sendForm($(this));

		return false;
	});

	// agregando el evento al boton del menu
	$("#menu-open").on("click", function(){
		$("#responsive-nav ul").toggleClass("active");
		$(this).toggleClass("glyphicon-menu-hamburger");
	});

})()
