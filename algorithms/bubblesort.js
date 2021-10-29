async function BubbleSort(A, n) {
  
  for (let i = 0; i < n ; i += 2) {
    
    for (let j = 0; j < n - 1; j++) {
      
      if (A[j].value > A[j + 1].value) {
        // A[j].color = marked
        await swap(A, j, j + 1);
        // A[j + 1].color = unmarked
      }
    }
    
    for (let j = n - 1; j > 0; j--) {
      if (A[j].value < A[j - 1].value) {
        // A[j].color = marked
        await swap(A, j, j - 1);
        // A[j - 1].color = unmarked
      }
    }
  }
  
  //await shuffleArray(A);
  //await BubbleSort(A,n);
}