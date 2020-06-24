window.onload = function() {

	var pass2 = document.getElementById("pass2");
	var terminos = document.getElementById("terminos");
	var boton = document.getElementById("enviar");
	var formu = document.getElementById("formulario");
	var body = document.querySelector('body');

	terminos.addEventListener('click', validaCheck, false);
	document.getElementById("provincia").onchange = validarCP;
	document.getElementById("cp").oninput = validarCP;
	
	/*Con esta funcion que los checkbox obligatorios esten marcados mostrando su correspondiente
	mensaje además se especifica un patron para el telefono con prefijo internacional y 
	comprueba que las contraseñas sean iguales al darle al botón de enviar
	*/
	formu.addEventListener('submit',function(evento) {
		var event = evento || window.evento;
		var genero = document.formulario.genero.value;
		var focusgenero = document.getElementsByName("genero")[0];
		var etiquetaGenero = document.getElementById("generoLabel");

		if(genero.length === 0) {
			event.preventDefault();
			etiquetaGenero.innerHTML = "Sexo <span class='rojo'>"
			+ "*Campo obligatorio</span>";
			focusgenero.focus();
		} else {
			etiquetaGenero.innerHTML = "Sexo <span class='uno'>*</span>";
		}

		var telfInternacional = document.getElementById("internacional").value;
		var re =/^\+\d{2,3}\s\d{9}$/;
		var focusInternacional = document.getElementById("internacional");
		var labelInternacional = document.getElementById("internacionalLabel");
		if (!re.test(telfInternacional)) {
			event.preventDefault();
			document.getElementById("internacionalLabel").innerHTML="Telefono móbil (prefijo internacional)" + 
			"<span class='rojo'> *El formato no coincide </span>";
			focusInternacional.focus();
		} else {
			labelInternacional.innerHTML="Telefono móvil (prefijo internacional)";
		}

		var formulario = document.getElementById("formulario");
		var daw = document.forms["formulario"].elements["daw"];
		var asi = document.forms["formulario"].elements["asi"];
		var dam = document.forms["formulario"].elements["dam"];
		var otros = document.forms["formulario"].elements["otros"];
		var focusEstudios = document.getElementsByName("daw")[0];

		if ((!daw.checked) && (!asi.checked) 
			&& (!dam.checked) && (!otros.checked)) {
			event.preventDefault();
			document.getElementById("estudiosLabel").innerHTML = "Estudios" + 
			"<span class='rojo'> *Campo obligatorio</span>";
			focusEstudios.focus();
		} else {
			document.getElementById("estudiosLabel").innerHTML  = "Estudios <span class='uno'>*</span>";
		}

		var pass1 = document.getElementById("pass").value;
		var pass2 = document.getElementById("pass2").value;
		var focusPass = document.getElementById("pass");
		if(pass1 != pass2) {
			event.preventDefault();
			alert("¡¡¡¡Las contraseñas no coinciden!!!!");
			focusPass.focus();
		}

	}, false);

	/*Este método sirve para activar el boton de enviar una vez aceptados los términos*/
	function validaCheck() {
		var elemento = document.getElementById("terminos") || document.forms["formulario"].elements["terminos"];
		var botonEnviar = document.getElementById("enviar"); //document.forms.formulario.enviar;

		if (elemento.checked) {
			botonEnviar.disabled = false;
		} else {
			botonEnviar.disabled = true;
		}

	}
	/*Metodo con un patrón para el CP (que coincida con la provincia)
	Hay que introducir primero en le formulario la provincia antes que el 
	CP, Si no puede dar un error*/
	function validarCP() {
		var patrones = {
			//_:['', "Campo obligatorio"],
			coru: ['^[15][0-9]{3}', "El CP de A Coruña debe comenzar por 15"],
			orense: ['^[32][0-9]{3}', "El CP de Orense debe comenzar por 32"],
			lugo: ['^[27][0-9]{3}', "El CP de Lugo debe comenzar por 27"],
			ponte: ['^[36][0-9]{3}', "El CP de Pontevedra debe comenzar por 32"]
		};
		var provincia = document.getElementById("provincia").value;
		var cp = document.getElementById("cp");

		var patron = new RegExp(patrones[provincia][0],"");
		console.log(patron);

		if(patron.test(cp.value)) {
			cp.setCustomValidity("");
		} else {
			cp.setCustomValidity(patrones[provincia][1]);
		}
	}
}