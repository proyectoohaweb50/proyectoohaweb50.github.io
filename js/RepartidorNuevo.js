import {
    getAuth,
    getFirestore
  } from "../lib/fabrica.js";
  import {
    getString,
    muestraError
  } from "../lib/util.js";
  import {
    muestraRepartidors();  
  } from "./navegacion.js";
  import {
    tieneRol
  } from "./seguridad.js";
  
  const daoRepartidor =  
    getFirestore().
      collection("Repartidor");  
  /** @type {HTMLFormElement} */
  const forma = document["forma"];
  getAuth().onAuthStateChanged(
    protege, muestraError);
  
  /** @param {import(
      "../lib/tiposFire.js").User}
      usuario */
  async function protege(usuario) {
    if (tieneRol(usuario,
      ["Administrador"])) {
      forma.addEventListener(
        "submit", guarda);
    }
  }
  
  /** @param {Event} evt */
  async function guarda(evt) {
    try {
      evt.preventDefault();
      const formData =
        new FormData(forma);
      const clave = getString(
          formData, "clave").trim();  /** clave = matricula*/
      const nombre = getString(formData, "nombre").trim();
      const telefono = getString(formData, "telefono").trim();
      const triciclo = getString(formData, "triciclo").trim();  
      const fecha = getString(formData, "fecha").trim();
     /**
       * @type {
          import("./tipos.js").
                  Repartidor} */   
      const modelo = {
        clave,  
        nombre,  
        telefono,
        triciclo,  
        fecha 
      };
      await daoRepartidor.  
        add(modelo);
      muestraRepartidors();  
    } catch (e) {
      muestraError(e);
    }
  }
