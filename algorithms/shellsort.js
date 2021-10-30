// https://en.wikipedia.org/wiki/Shellsort

async function ShellSort(A) {
  let gaps = [701, 301, 132, 57, 23, 10, 4, 1]  // Ciura gap sequence

  for (k = 0; k < gaps.length; k++) {

    for (i = gaps[k]; i < A.length; i++) {
      await sleep(20);

      setFreq(osc1, i);

      let temp = A[i];
      let j;

      for (j = i; j >= gaps[k] && A[j - gaps[k]].value > temp.value; j -= gaps[k]) {
        await sleep(20);
        A[j] = A[j - gaps[k]];
        setFreq(osc2, j);
      }

      A[j] = temp
    }
  }
}
