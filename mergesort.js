async function MergeSort(A, l, r) {
  await sleep(200);
  
  if (l < r) {
    let m = floor((l+r) / 2);
    
    // A[m].color = marked;
    
    let temp = A[m]
    
    await Promise.all([
      MergeSort(A, l, m),
      MergeSort(A, m + 1, r)
    ]);
    
    await Merge(A, l, m, r, temp);
  }
  
}


async function Merge(A, l, m, r, temp) {
  await sleep(200);
  
  let n1 = m - l + 1;
  let n2 = r - m;
  
  /* Create temp arrays */
  let L = [];
  let R = [];
  
  /* Copy data to temp arrays L[] and R[] */
  for (let i = 0; i < n1; i++) {
    L[i] = A[l + i];
  }
  
  for (let j = 0; j < n2; j++) {
    R[j] = A[m + 1 + j];
  }
  
  
  /* Merge the temp arrays back into array[l..r]*/
  let i = 0;
  let j = 0;
  let k = l;
  
  while (i < n1 && j < n2) {
    await sleep(5);
    if (L[i].value <= R[j].value) {
      A[k] = L[i];
      i++;
    }
    
    else {
      A[k] = R[j];
      j++;
    }
    
    k++;
    
  }
  
  /* Copy the remaining elements of L[], if there are any */
  while (i < n1) {
    A[k] = L[i];
    i++;
    k++;
  }
  
  /* Copy the remaining elements of R[], if there are any */
  while (j < n2) {
    A[k] = R[j];
    j++;
    k++;
  }
  
  // temp.color = unmarked;
}

