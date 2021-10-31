// https://en.wikipedia.org/wiki/Cycle_sort

async function CycleSort(A) {
  writes = 0

  for (let cycle_start = 0; cycle_start < A.length - 1; cycle_start++) {
    await sleep(40)
    let item = A[cycle_start]

    let pos = cycle_start;
    for (let i = cycle_start + 1; i < A.length; i++) {
      if (A[i].value < item.value) {
        pos++;
      }
    }

    if (pos == cycle_start) {
      continue;
    }

    while (item.value == A[pos].value) {
      pos++;
    }

    // array[pos], item = item, array[pos]
    // await swap(A, cycle_start, pos);
    await cycleSwap(A[pos], item);
    writes++;

    while (pos != cycle_start) { 
      pos = cycle_start
      for (let i = cycle_start + 1; i < A.length; i++) {
        if (A[i].value < item.value) {
          pos++;
        }
      }
      while (item.value == A[pos].value) {
        pos++;
      }
      // array[pos], item = item, array[pos]
      // await swap(A, cycle_start, pos);
      await cycleSwap(A[pos], item);
      writes++;
    }
  }

  return writes;
}

async function cycleSwap(a, b) {
  await sleep(5);
  console.log(a)
  let temp = a;
  a = b;
  b = temp;
}
