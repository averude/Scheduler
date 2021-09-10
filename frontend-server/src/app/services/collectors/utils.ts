import { Composition } from "../../model/composition";

export function exchangeComposition(compositions: Composition[],
                                    newComposition: Composition) {
  const oldCompositionIndex = compositions.findIndex(composition => composition.id === newComposition.id);
  if (oldCompositionIndex >= 0) {
    compositions.splice(oldCompositionIndex, 1, newComposition);
  } else {
    compositions.push(newComposition);
    compositions.sort((a,b) => a.from.diff(b.from));
  }
}
