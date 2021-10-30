// https://en.wikipedia.org/wiki/Insertion_sort


// i ← 1
// while i < length(A)
//     j ← i
//     while j > 0 and A[j-1] > A[j]
//         swap A[j] and A[j-1]
//         j ← j - 1
//     end while
//     i ← i + 1
// end while


async function InsertionSort(A) {
  for (let i = 1; i < A.length; i++) {
    let j = i;

    while (j > 0 && A[j - 1] > A[j]) {
      await swap(A[j], A[j - 1]);
      j--;
    }
    i++;
  }
}
