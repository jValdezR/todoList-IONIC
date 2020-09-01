import { Injectable, ViewChild } from "@angular/core";
import { Lista } from "../models/lista.model";
import { AlertController, IonList } from "@ionic/angular";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  listas: Lista[] = [];
  @ViewChild(IonList) cerrar: IonList;

  constructor(private _alert: AlertController, private _router: Router) {
    console.log("Servicio inicializado");
    this.cargarStorage();
  }

  crearLista(titulo: string) {
    const nuevaLista = new Lista(titulo);
    this.listas.push(nuevaLista);
    this.guardarStorage();
    return nuevaLista.id;
  }

  obtenerLista(id: string | number) {
    id = Number(id);

    return this.listas.find((listaData) => listaData.id === id);
  }
  guardarStorage() {
    localStorage.setItem("data", JSON.stringify(this.listas));
  }

  cargarStorage() {
    if (localStorage.getItem("data")) {
      this.listas = JSON.parse(localStorage.getItem("data"));
    } else {
      this.listas = [];
    }
  }

  borrarLista(lista: Lista) {
    this.listas = this.listas.filter((data) => {
      return data.id !== lista.id;
    });
    this.guardarStorage();
  }
}
