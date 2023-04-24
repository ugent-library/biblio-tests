export function getAlphabet() {
  return Array.from({ length: 26 }, (_, i) => String.fromCharCode(i + 65)).map(l => l.toUpperCase())
}
