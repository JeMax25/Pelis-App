import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutesToHours'
})

export class MinutesToHoursPipe implements PipeTransform {
  transform(minutes:number): string {

    // Convertir los minutos en horas
    const hours = Math.floor(minutes / 60);
    // Calcular los minutos restantes
    const remainingMinutes = minutes % 60;
    // Devolver una cadena que representa las horas y minutos convertidos
    return `${hours}h ${remainingMinutes}m`;

  }
}
