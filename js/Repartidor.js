import {
    getAuth,
    getFirestore
  } from "../lib/fabrica.js";
  import {
    getString,
    muestraError
  } from "../lib/util.js";
  import {
    muestraAlumnos
  } from "./navegacion.js";
  import {
    tieneRol
  } from "./seguridad.js";
  
  const daoAlumno =
    getFirestore().
      collection("Repartidor");
  const params =
    new URL(location.href).
      searchParams;
  const id = params.get("id");
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
      busca();
    }
  }
  
  /** Busca y muestra los datos que
   * corresponden al id recibido. */
  async function busca() {
    try {
      const doc =
        await daoRepartidor.
          doc(id).
          get();
      if (doc.exists) {
        /**
         * @type {
            import("./tipos.js").
                    Repartidor} */
        const data = doc.data();
        forma.clave.value = data.clave;
        forma.nombre.value = data.nombre || "";
        forma.telefono.value = data.telefono || "";
        forma.triciclo.value = data.triciclo || "";
        forma.fecha.value = data.fecha || "";
        forma.addEventListener(
          "submit", guarda);
        forma.eliminar.
          addEventListener(
            "click", elimina);
      } else {
        throw new Error(
          "No se encontró.");
      }
    } catch (e) {
      muestraError(e);
      muestraRepartidors();
    }
  }
  
  /** @param {Event} evt */
  async function guarda(evt) {
    try {
      evt.preventDefault();
      const formData =
        new FormData(forma);
      const clave = getString(
          formData, "matricula").trim();  
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
        doc(id).
        set(modelo);
      muestraRepartidors();
    } catch (e) {
      muestraError(e);
    }
  }
  
  async function elimina() {
    try {
      if (confirm("Confirmar la " +
        "eliminación")) {
        await daoRepartidor.
          doc(id).
          delete();
        muestraRepartidors();
      }
    } catch (e) {
      muestraError(e);
    }
  }
