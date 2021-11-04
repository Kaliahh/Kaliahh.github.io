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


async function GnomeSortOpt(A) {
  for (let pos = 1; pos < A.length; pos++) {
    await GSort(A, pos);
  }
}

async function GSort(A, upper) {
  let pos = upper;

  while (pos > 0 && A[pos - 1].value > A[pos].value) {
    await swap(A, pos - 1, pos);
    pos--;
  }
}

// procedure optimizedGnomeSort(a[]):
//     for pos in 1 to length(a):
//         gnomeSort(a, pos)
//
// procedure gnomeSort(a[], upperBound):
//     pos := upperBound
//     while pos > 0 and a[pos-1] > a[pos]:
//         swap a[pos-1] and a[pos]
//         pos := pos - 1
