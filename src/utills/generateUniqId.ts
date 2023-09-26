export default function generateUniqId(start: number = 0): Function {
  return () => ++start;
}
