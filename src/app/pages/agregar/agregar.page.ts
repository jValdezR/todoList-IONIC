import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { ListaItem } from '../../models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  listaNueva: Lista;
  nombreItem: '';
  // tslint:disable-next-line: variable-name
  constructor(private _todoService: TodoService,
              private _route: ActivatedRoute) {

      const listaId = this._route.snapshot.paramMap.get('listaID');
      this.listaNueva = this._todoService.obtenerLista(listaId);

      console.log(this.listaNueva);
     }


  ngOnInit() {
  }
agregarItem(){
    if(this.nombreItem.length === 0){
      return;
    }
    const nuevoItem = new ListaItem(this.nombreItem);
    this.listaNueva.items.push(nuevoItem);

    this.nombreItem = '';

    this._todoService.guardarStorage();
}

cambioCheck(item:ListaItem){
    
  const pendientes = this.listaNueva.items.filter(data =>{
    return data.completado === false;
  }).length;

  if(pendientes === 0){
    this.listaNueva.terminadaEn = new Date();
    this.listaNueva.completada = true;
  }else{
    this.listaNueva.terminadaEn = null;
    this.listaNueva.completada = false;
  }


  this._todoService.guardarStorage();

  console.log(this._todoService.listas);
}
borrar(i: number){
        this.listaNueva.items.splice(i, 1);
        this._todoService.guardarStorage();
}
}
