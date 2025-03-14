export class Shape {
  constructor(
    public vertex: number[],
    public color: number[],
    public x: number,
    public y: number,
    public scale: number
  ) {}

  public get hash(): string {
    return `${this.vertex}-${this.color}`;
  }

  public static triangle(x: number, y: number, color: number[]) {
    const vertex = [0, 1, -1, -1, 1, -1];
    return new Shape(vertex, color, x, y, 0.025);
  }
}
