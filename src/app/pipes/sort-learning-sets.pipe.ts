import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortLearningSets'
})
export class SortLearningSetsPipe implements PipeTransform {

  transform(learningSets: any[] | null, isPinnedFirst: boolean = true): any[] {
    if (!learningSets) {
      return [];
    }

    return learningSets.sort((a, b) => {
     // Zuerst nach isPinned sortieren
    if (isPinnedFirst) {
      if (a.isPinned !== b.isPinned) {
        return a.isPinned ? -1 : 1;
      }
    } else {
      if (a.isPinned !== b.isPinned) {
        return b.isPinned ? -1 : 1;
      }
    }

    // Wenn isPinned gleich ist, nach einem alphabetischen Kriterium sortieren
    // Hier nehme ich an, dass die Objekte ein Feld haben, das wir zum Sortieren verwenden können
    // Zum Beispiel 'name' oder 'title'
    return a.name.localeCompare(b.name)

    });
  }

}
