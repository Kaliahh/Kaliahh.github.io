async function HeapSort(A) {
  await Heapify(A, A.length);

  let end = A.length - 1;

  while (end > 0) {
    await swap(A, end, 0);
    end--;
    await SiftDown(A, 0, end);
  }
}


async function Heapify(A, n) {
  let start = iParent(n - 1);

  while (start >= 0) {
    await SiftDown(A, start, n - 1);
    start--;
  }
}


async function SiftDown(A, start, end) {
  let root = start;

  while (iLeftChild(root) <= end) {
    let child = iLeftChild(root);
    let temp = root;

    if (A[temp].value < A[child].value) {
      temp = child;
    }
    if (child + 1 <= end && A[temp].value < A[child + 1].value) {
      temp = child + 1;
    }
    if (temp == root) {
      return;
    }
    else {
      await swap(A, root, temp);
      root = temp;
    }
  }
}


function iParent(i) {
  return floor((i - 1) / 2);
}

function iLeftChild(i) {
  return 2 * i + 1;
}

function iRightChild(i) {
  return 2 * i + 2;
}
