async function QuickSort(A, start, end) {
  if (start < end) {
    let index = await Partition(A, start, end);

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

  for (let i = start; i < end; i++) {
    if (A[i].value < pivotValue) {
      await swap(A, i, pivotIndex);
      pivotIndex++;
    }
  }

  await swap(A, pivotIndex, end);
  return pivotIndex;
}
