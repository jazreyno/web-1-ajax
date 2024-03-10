"use strict"
let form = document.querySelector('#form');

let captcha = document.querySelector("#captchavalue").innerHTML = Math.floor((Math.random()*700)+1);

let Inputcaptcha = document.querySelector("#inputcaptcha");


let btn = document.querySelector("#btn-registrar");
btn.addEventListener("click", comprobar);


function comprobar(e){
    let input = document.querySelector("#inputcaptcha").value;

    e.preventDefault();

    let formData = new FormData(form);
    let nombre = formData.get("nombre");
    let email = formData.get("email");
    let password = formData.get("password");

    
    if( input == captcha){
        document.querySelector(".resultado").innerHTML = "El numero ingresado es correcto y su formulario fue enviado";
        console.log (nombre, email, password);
    }
    else{
        document.querySelector(".resultado").innerHTML = "El numero ingresado no es correcto, para que se envien sus datos, intente otra vez";
    }
}

