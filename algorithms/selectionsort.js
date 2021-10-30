// https://en.wikipedia.org/wiki/Selection_sort

async function SelectionSort(A) {
  for (let i = 0; i < A.length - 1; i++) {
    let jMin = i;
    for (let j = i + 1; j < A.length; j++) {
      if (A[j].value < A[jMin].value) {
        jMin = j;
      }
    }

    if (jMin != i) {
      await swap(A, i, jMin);
    }
  }
}
