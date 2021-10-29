async function QuickSort(A, start, end) {
  if (start < end) {
    let index = await Partition(A, start, end);
    
    // A[index].color = unmarked;
    
    await Promise.all([
      QuickSort(A, start, index - 1),
      QuickSort(A, index + 1, end)
    ]);
  }
  
  else {
    return;
  }
}

async function Partition(A, start, end) {
  let pivotIndex = start;
  let pivotValue = A[end].value;
  
  // A[pivotIndex].color = marked;
  
  // let temp = A[pivotIndex]
  
  for (let i = start; i < end; i++) {
    if (A[i].value < pivotValue) {
      await swap(A, i, pivotIndex);
      // temp.color = unmarked;
      pivotIndex++;
      // A[pivotIndex].color = marked;
    }
  }
  
  await swap(A, pivotIndex, end);
  return pivotIndex;
}