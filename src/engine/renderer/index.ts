import { Shape } from "./Shape";
import { WebGLAdapter } from "./WebGLAdapter";

export interface IDrawShapeParams {
  x: number;
  y: number;
  color: number[];
}

export class Renderer {
  private ctx: WebGL2RenderingContext;
  private webgl: WebGLAdapter;

  private shapeBuffer: Shape[] = [];

  constructor() {
    this.ctx = this.createContext();
    this.webgl = new WebGLAdapter(this.ctx);
  }

  public createContext() {
    const canvas = document.createElement("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const createdContext = canvas.getContext("webgl2");
    if (!createdContext) {
      throw new Error("Falha ao carregar contexto do canvas.");
    }

    document.body.appendChild(canvas);
    return createdContext;
  }

  public drawTriangle({ x, y, color }: IDrawShapeParams) {
    this.shapeBuffer.push(Shape.triangle(x, y, color));
  }

  public drawCircle({ x, y, color }: IDrawShapeParams) {
    this.shapeBuffer.push(Shape.circle(x, y, color));
  }

  public drawSquare({ x, y, color }: IDrawShapeParams) {
    this.shapeBuffer.push(Shape.square(x, y, color));
  }

  public clear() {
    this.webgl.clear();
  }

  public drawBuffer() {
    this.webgl.renderShapes(this.shapeBuffer);
    this.shapeBuffer = [];
  }
}
