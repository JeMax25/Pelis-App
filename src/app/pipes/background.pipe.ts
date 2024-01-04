import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'background'
})

export class backgroundPipe implements PipeTransform {
  transform(backdrop: string, quality: string ):string{

    if(backdrop == null)return '';

    const url:string = 'url(https://image.tmdb.org/t/p/'

    return `${url}${quality}${backdrop}`
  }
}
