async function BubbleSort(A) {
  for (let i = 0; i < A.length ; i += 2) {

    for (let j = 0; j < A.length - 1; j++) {
      if (A[j].value > A[j + 1].value) {
        await swap(A, j, j + 1);
      }
    }
    
    // for (let j = A.length - 1; j > 0; j--) {
    //   if (A[j].value < A[j - 1].value) {
    //     await swap(A, j, j - 1);
    //   }
    // }
  }
}
