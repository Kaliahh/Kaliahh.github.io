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
  await sleep20();

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
    await sleep2();

    if (L[i].value <= R[j].value) {
      A[k] = L[i];
      setFreq(osc1, i++);
    }
    else {
      A[k] = R[j];
      setFreq(osc2, j++);
    }

    k++;
  }

  while (i < n1) {
    await sleep2();
    A[k] = L[i];
    setFreq(osc1, i++);

    k++;
  }

  while (j < n2) {
    await sleep2();
    A[k] = R[j];
    setFreq(osc2, j++);

    k++;
  }
}
