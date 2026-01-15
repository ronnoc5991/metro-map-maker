let idCounter = 0;

export default function uniqueId(): number {
  return idCounter++;
}
