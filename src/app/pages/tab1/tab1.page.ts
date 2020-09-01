import { Component } from "@angular/core";
import { TodoService } from "../../services/todo.service";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  constructor(
    public _todoService: TodoService,
    private _router: Router,
    private _alert: AlertController
  ) {}

  async agregarLista() {
    //this._router.navigateByUrl('/tabs/tab1/agregar');
    const alert = await this._alert.create({
      cssClass: "my-custom-class",
      header: "Nueva lista",
      inputs: [
        {
        name: 'titulo',
        type: 'text',
        placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () =>{
            console.log('Cancelar');
          }
        },
        {
          text: 'Crear',
          handler: (data) =>{
            console.log(data);
            if (data.titulo.lenght === 0){
                return;
            }
            else{
              const listaID = this._todoService.crearLista(data.titulo);
              this._router.navigateByUrl(`/tabs/tab1/agregar/${listaID}`)
            }
          }
        }
      ],
    });

    alert.present();
  }
}
