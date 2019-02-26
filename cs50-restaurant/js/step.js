;(function(){

	$(".step:nth-child(1)").addClass("active");

	const selector = "#contact-form";

	// agregando el listener a los botones de cambio
	$('.path-step').on('click', (ev)=>{
		const $current = $(ev.target);
		$('.path-step.active').removeClass('active');
		$current.addClass('active');

		const pos = $current.index('.path-step') + 1;

		let $test = $(".step:nth-child("+pos+")");
		change_step($test);
	});

	$(selector).find('.input').on("change", (ev)=>{
		const $input = $(ev.target);
		const $next_step = $input.parent().next('.step');

		const is_form_valid = form_valido();

		if(!is_form_valid && $next_step.length > 0){
			change_step($next_step);
		}else{
			valida_form();
		}
		
	});

	// Helpers
	
	function valida_form(){
		if(form_valido()){
			sendForm();
		}else{
			$fieldset_invalido = $(selector).find('.input:invalid').first().parent();
			change_step($fieldset_invalido);
		}
	}

	function form_valido(){
		return document.querySelector(selector).checkValidity();
	}

	function change_step($next_input){
		$('.step.active').removeClass('active');
		$next_input.addClass('active');
		$next_input.find('.input').focus();

		// coordinando los circulos
		const pos = ($next_input.index('.step') * 2) + 2;
		console.log(pos);
		$('.path-step.active').removeClass('active');
		$(".path-step:nth-child("+pos+")").addClass('active'); 

		//$next_input.focus();
	}

	function sendForm(){
		const $form = $(selector);
		console.log($form.formObject());
		$.ajax({
			url: $form.attr("action"),
			method: "POST",
			data: $form.formObject(),
			dataType: "json",
			success: function(){
				//alert("Formulario enviado con éxito!");
				$form.slideUp();
				$('#info-contacto').html("Enviamos tu mensaje, pronto nos pondremos en contacto contigo.");
			}
		});
	}

	$('.step textarea').on('keydown', (ev)=>{
		if(ev.keyCode == 13){
			ev.preventDefault();

			$(ev.target).blur();
		}
	});

})()