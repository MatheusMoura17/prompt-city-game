import { Vector1 } from "./Vector1";

export class Vector2 {
  public constructor(public x: number, public y: number) {}

  static lerp(start: Vector2, end: Vector2, t: number): Vector2 {
    return new Vector2(
      Vector1.lerp(start.x, end.x, t),
      Vector1.lerp(start.y, end.y, t)
    );
  }

  static moveTowards(start: Vector2, end: Vector2, distance: number): Vector2 {
    const angle = Math.atan2(end.y - start.y, end.x - start.x);
    return new Vector2(
      start.x + distance * Math.cos(angle),
      start.y + distance * Math.sin(angle)
    );
  }

  static distance(a: Vector2, b: Vector2): number {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
  }

  static zero = new Vector2(0, 0);
  static one = new Vector2(1, 1);
}
