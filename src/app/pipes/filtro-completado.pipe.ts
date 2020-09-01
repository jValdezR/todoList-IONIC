import { Pipe, PipeTransform } from '@angular/core';
import { Lista } from '../models/lista.model';

@Pipe({
  name: 'filtroCompletado',
  pure: false// Cada vez que haya cambio, se llama al filtro
})
export class FiltroCompletadoPipe implements PipeTransform {

  transform(listas: Lista[],completada: boolean=true): Lista[] {

    return listas.filter(lista =>{
      return lista.completada === completada;
    });

  }

}
