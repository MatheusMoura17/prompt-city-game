export class Vector1 {
  static lerp(start: number, end: number, t: number) {
    return start + t * (end - start);
  }
}
