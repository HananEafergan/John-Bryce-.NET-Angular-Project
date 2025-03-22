import { Injectable } from '@angular/core';

@Injectable()
export class GlobalFuncService {

  constructor() { }

  filterArray<T>(array: T[], value: string, keyToRemove: string): T[] {
    return array?.filter((item: any) => {
      const itemWithoutKey = {
        ...item,
        [keyToRemove]: undefined,
      }
      const itemWithoutKeyStr = JSON.stringify(Object.values(itemWithoutKey));
      return itemWithoutKeyStr.toLowerCase().includes(value.toLowerCase());
    })
  }  

  calculateRentPrice(startDate: Date, endDate: Date, price: number) {
    const msPerDay = 1000 * 60 * 60 * 24;
    const endDateMS: number = new Date(endDate).setHours(0, 0, 0, 0);
    const startDateMS: number = new Date(startDate).setHours(0, 0, 0, 0);
    let diffInMs = endDateMS - startDateMS;

    if (endDate === startDate) {
      diffInMs = msPerDay;
    }

    return Math.floor(diffInMs / msPerDay) * price;
  }
}
