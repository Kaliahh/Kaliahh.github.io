// https://en.wikipedia.org/wiki/Odd%E2%80%93even_sort

async function OddEvenSort(A) {
  let isSorted = false;

  let backwardsStart = A.length - 2;
  let forwardsStart = (A.length % 2 == 0) ? 0 : 1;

  while (!isSorted) {
    isSorted = true;

    await Promise.all([
      EvenOddHelper(A, forwardsStart, true),
      EvenOddHelper(A, backwardsStart, false)
    ]).then(values => {
      isSorted = values[0] && values[1];
    });
  }
}

async function EvenOddHelper(A, k, direction) {
  let sorted = true;

  // direction: true is forwards, false is backwards
  for (let i = k; direction ? i <= A.length - 2 : i >= 1; direction ? i += 2 : i -= 2) {
    await sleep(10);

    if (direction ? A[i].value > A[i + 1].value : A[i].value < A[i - 1].value) {
      setFreq(direction ? osc2 : osc1, i);
      fastSwap(A, i, direction ? i + 1 : i - 1);
      sorted = false;
    }
  }

  return sorted
}

// A fast swap is needed so that the two directions stay in sync
function fastSwap(arr, a, b) {
  let temp = arr[a];
  arr[a] = arr[b]
  arr[b] = temp;
}
