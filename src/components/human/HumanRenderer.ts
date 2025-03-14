import { Component } from "../../engine/Component";
import { Transform } from "../Transform";
import { HumanStats } from "./HumanStats";

export class HumanRenderer extends Component {
  private humanStats?: HumanStats;
  private transform?: Transform;

  public start() {
    this.transform = this.gameObject.getComponent(Transform);
    this.humanStats = this.gameObject.getComponent(HumanStats);
  }

  public render() {
    if (!this.transform)
      throw new Error("Componente transform nao encontrado!");
    if (!this.humanStats)
      throw new Error("Componente humanStats nao encontrado!");

    const { color } = this.humanStats;
    const { x, y } = this.transform.position;

    this.renderer.drawCircle({
      x,
      y,
      color,
    });
  }
}
