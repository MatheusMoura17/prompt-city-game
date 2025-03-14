export class Shape {
  constructor(
    public triangles: number[][],
    public color: number[],
    public x: number,
    public y: number,
    public scale: number
  ) {}

  public static triangle(
    x: number,
    y: number,
    color: number[]
  ) {
    const height = (Math.sqrt(3) / 2) * 1;

    const triangles: number[][] = [
      [-0.5, 0, 0.5, 0, 0, height],
    ];

    return new Shape(triangles, color, x, y, 0.1);
  }

  public static circle(
    x: number,
    y: number,
    color: number[],
    segments: number = 20
  ) {
    const triangles: number[][] = [];
    const radius = 0.5;
    const centerX = 0;
    const centerY = 0;

    for (let i = 0; i < segments; i++) {
      const theta1 = (i / segments) * 2 * Math.PI;
      const theta2 = ((i + 1) / segments) * 2 * Math.PI;

      const x1 = Math.cos(theta1) * radius + centerX;
      const y1 = Math.sin(theta1) * radius + centerY;

      const x2 = Math.cos(theta2) * radius + centerX;
      const y2 = Math.sin(theta2) * radius + centerY;

      triangles.push([centerX, centerY, x1, y1, x2, y2]);
    }

    return new Shape(triangles, color, x, y, 0.1);
  }

  public static square(
    x: number,
    y: number,
    color: number[]
  ) {
    const halfSize = 0.5;
  
    const triangles: number[][] = [
      // Primeiro triângulo: (-0.5, -0.5), (0.5, -0.5), (-0.5, 0.5)
      [-halfSize, -halfSize, halfSize, -halfSize, -halfSize, halfSize],
      // Segundo triângulo: (0.5, -0.5), (0.5, 0.5), (-0.5, 0.5)
      [halfSize, -halfSize, halfSize, halfSize, -halfSize, halfSize],
    ];
  
    return new Shape(triangles, color, x, y, 0.1);
  }
}
