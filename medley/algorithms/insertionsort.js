// https://en.wikipedia.org/wiki/Insertion_sort

async function InsertionSort(A) {
  for (let i = 1; i < A.length; i++) {

    for (let j = i; j > 0 && A[j - 1].value > A[j].value; j--) {
      await swap(A, j, j - 1);
    }
  }
}
