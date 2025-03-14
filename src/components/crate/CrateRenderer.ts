import { Component } from "../../engine/Component";
import { Transform } from "../Transform";

export class CrateRenderer extends Component {
  private transform?: Transform;

  public start() {
    this.transform = this.gameObject.getComponent(Transform);
  }

  public render() {
    if (!this.transform)
      throw new Error("Componente transform nao encontrado!");

    const { x, y } = this.transform.position;

    this.renderer.drawSquare({
      x,
      y,
      color: [1.0, 1.0, 1.0, 1.0]
    });
  }
}
