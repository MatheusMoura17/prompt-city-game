import { IDrawCircleParams } from "./CircleDrawer";
import { Shape } from "./Shape";
import { WebGLAdapter } from "./WebGLAdapter";

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

  public drawCircle(drawCircleParams: IDrawCircleParams) {
    this.shapeBuffer.push(
      Shape.triangle(
        drawCircleParams.x,
        drawCircleParams.y,
        drawCircleParams.color
      )
    );
  }

  public clear() {
    this.webgl.clear();
  }

  public drawBuffer() {
    this.webgl.renderShapes(this.shapeBuffer);
    this.shapeBuffer = [];
  }
}
