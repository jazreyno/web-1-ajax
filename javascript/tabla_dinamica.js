"use strict";
const url = "https://62bc579d6b1401736cf85721.mockapi.io/ejemplo";

window.onload = mostrarTabla();
let id = 0;
async function mostrarTabla() {
  let tabla = document.querySelector("#tabla-din");
  try {
    let res = await fetch(url);
    if (res.ok) {
      let json = await res.json();
      tabla.innerHTML = "<th> N°</th><th>Videojuego</th> <th>Opinion</th> <th>Acciones</th>";
      for (const elem of json) {
        let videojuego = elem.videojuego;
        let opinion = elem.opinion;
        id = elem.id;

        let boton_borrar = document.createElement("button");
        boton_borrar.innerHTML = "Borrar";
        boton_borrar.id = id;
        boton_borrar.addEventListener("click", borrarDato);
        boton_borrar.className = "acciones";
        
        let boton_editar=document.createElement("button");
        boton_editar.innerHTML="Editar";
        boton_editar.id = id;
        boton_editar.className = "acciones";
      
        boton_editar.addEventListener("click", modificarDatos);

        let td = document.createElement("td");

        let fila_contenedora = document.createElement("tr");

        fila_contenedora.innerHTML += `<td>${id}</td>
                         <td>${videojuego}</td>
                         <td>${opinion}</td>
                          `;

        td.appendChild(boton_borrar);
        fila_contenedora.appendChild(td);
        tabla.appendChild(fila_contenedora);

        td.appendChild(boton_editar);
        fila_contenedora.appendChild(td);
        tabla.appendChild(fila_contenedora);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

async function enviarDatos(e) {
  
  let nombre = document.querySelector("#input_juego").value;
  let opinion = document.querySelector("#input_opinion").value;

  let info = {
    videojuego: nombre,
    opinion: opinion,
  };
  try {
    let res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    }).then((res) => mostrarTabla());
  } catch (error) {
    console.log(error);
  }
}
let boton = document.querySelector("#boton_tabla").addEventListener("click", enviarDatos);
  
  
  async function modificarDatos() {
    let nombre = document.querySelector("#input_juego").value;
    let opinion = document.querySelector("#input_opinion").value;
    let boton_editar = this;
    let info_id2 = this.id;
  
    let info = {
      videojuego: nombre,
      opinion: opinion,
    }
  
    try {
      let res = await fetch(`${url}/${info_id2}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      }).then((res) => editarFila(boton_editar));
    } catch (error) {
      console.log(error);
    }
    mostrarTabla();
  }
  
async function borrarDato() {
  let boton_borrar = this;
  let info_id = this.id;
  try {
    let res = await fetch(`${url}/${info_id}`, {
      method: "DELETE",
    }).then((res) => borrarFila(boton_borrar));
  } catch (error) {
    console.log(error);
  }
}

function borrarFila(boton_borrar) {
  let td = boton_borrar.parentElement;
  let tr = td.parentElement;
  console.log(tr);
  tr.remove();
}
