async function MergeSort(A, l, r) {
  await sleep(10);

  if (l < r) {
    let m = floor((l+r) / 2);
    let temp = A[m]

    await Promise.all([
      MergeSort(A, l, m),
      MergeSort(A, m + 1, r)
    ]);

    await Merge(A, l, m, r, temp);
  }
}

async function Merge(A, l, m, r, temp) {
  await sleep(300);

  let n1 = m - l + 1;
  let n2 = r - m;

  let L = [];
  let R = [];

  for (let i = 0; i < n1; i++) {
    L[i] = A[l + i];
  }

  for (let j = 0; j < n2; j++) {
    R[j] = A[m + 1 + j];
  }

  let i = 0;
  let j = 0;
  let k = l;

  while (i < n1 && j < n2) {
    await sleep(40);

    if (L[i].value <= R[j].value) {
      A[k] = L[i];
      i++;
    }
    else {
      A[k] = R[j];
      j++;
    }

    setFreq(k++)
  }

  while (i < n1) {
    await sleep(40);
    A[k] = L[i];
    i++;
    setFreq(k++)
  }

  while (j < n2) {
    await sleep(40);
    A[k] = R[j];
    j++;
    setFreq(k++)
  }
}
