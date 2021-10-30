// https://en.wikipedia.org/wiki/Gnome_sort

async function GnomeSort(A) {
  let i = 0;

  while (i < A.length) {
    if (i == 0 || A[i].value >= A[i - 1].value) {
      i++;
    }
    else {
      await swap(A, i, i - 1);
      i--;
    }
  }
}
