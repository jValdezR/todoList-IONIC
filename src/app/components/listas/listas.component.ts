import { Component, Input,ViewChild } from "@angular/core";
import { TodoService } from "../../services/todo.service";
import { Router } from "@angular/router";
import { Lista } from 'src/app/models/lista.model';
import { IonList, AlertController } from '@ionic/angular';

@Component({
  selector: "app-listas",
  templateUrl: "./listas.component.html",
  styleUrls: ["./listas.component.scss"],
})
export class ListasComponent {



  @Input() terminada = true;
  @ViewChild(IonList) cerrar: IonList;



  constructor(public _todoService: TodoService, public _router: Router, public _alert: AlertController) {}

  listaSeleccionada(item: Lista) {
    if (this.terminada) {
      this._router.navigateByUrl(`/tabs/tab2/agregar/${item.id}`);
    }
    else{
    this._router.navigateByUrl(`/tabs/tab1/agregar/${item.id}`);
    }
  }

  borrarLista(lista: Lista){
    this._todoService.borrarLista(lista);
  }

  async editarLista(lista: Lista){
    const alert = await this._alert.create({
      cssClass: "my-custom-class",
      header: "Editar lista",
      inputs: [
        {
          name: "titulo",
          type: "text",
          placeholder: lista.titulo,
        },
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          handler: () => {
            console.log("Cancelar");
          },
        },
        {
          text: "Editar",
          handler: (data) => {
            console.log("Esta es mi data ", { data });
            if (data.titulo.lenght === 0) {
              return;
            }
            lista.titulo = data.titulo;
            this._todoService.guardarStorage();
            this.cerrar.closeSlidingItems();
          },
        },
      ],
    });

    alert.present();
  }
}