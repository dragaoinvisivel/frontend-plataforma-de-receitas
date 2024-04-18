import { Lesson } from "@/models/models";

export function sortLessons(lessons: Lesson[]) {
  lessons.sort((a, b) => {
    const titleA = a.title.toUpperCase();
    const titleB = b.title.toUpperCase();

    const numberA = parseFloat(String(titleA.match(/\d+/)));
    const numberB = parseFloat(String(titleB.match(/\d+/)));

    if (numberA && numberB) {
      if (numberA !== numberB) {
        return numberA - numberB;
      } else {
        // Se os números forem iguais, ordena alfabeticamente
        return titleA.localeCompare(titleB);
      }
    } else if (!numberA && !numberB) {
      // Se ambos os títulos não contêm números, ordena alfabeticamente
      return titleA.localeCompare(titleB);
    } else {
      // Se apenas um título contém número, o que não contém vem primeiro
      return numberA ? 1 : -1;
    }
  });
}
