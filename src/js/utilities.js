// Sequence generator function
export function range(start, stop, step ) {
  // putting in ( 0, 4, 1)
  // will give us an array like [ 0, 1,2,3,4]
  return Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
}
