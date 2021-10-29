async function BubbleSort(A, n) {
  for (let i = 0; i < n ; i += 2) {

    for (let j = 0; j < n - 1; j++) {
      if (A[j].value > A[j + 1].value) {
        await swap(A, j, j + 1);
      }
    }

    for (let j = n - 1; j > 0; j--) {
      if (A[j].value < A[j - 1].value) {
        await swap(A, j, j - 1);
      }
    }
  }
}
