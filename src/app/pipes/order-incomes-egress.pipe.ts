import {Pipe, PipeTransform} from '@angular/core';
import {IncomeEgress} from '../models/income-egress.model';

@Pipe({
  name: 'orderIncomesEgress'
})
export class OrderIncomesEgressPipe implements PipeTransform {

  transform(items: IncomeEgress[]): IncomeEgress[] {
    return items.sort((a, b) => a.typeValue === 'income' ? -1 : 1);
  }

}
