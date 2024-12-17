import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'role',
  standalone: true,
})
export class RolePipe implements PipeTransform {

  transform(value: number): string {
    return value === 1 ? 'admin' : 'user';
  }

}
