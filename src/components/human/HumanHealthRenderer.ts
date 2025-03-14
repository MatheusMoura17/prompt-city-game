import { Component } from "../../engine/Component";
import { Transform } from "../Transform";
import { HumanStats } from "./HumanStats";

export class HumanHealthRenderer extends Component {
  private transform?: Transform;
  private humanStats?: HumanStats;

  public start() {
    this.transform = this.gameObject.getComponent(Transform);
    this.humanStats = this.gameObject.getComponent(HumanStats);
  }

  public render() {
    if (!this.transform)
      throw new Error("Componente transform nao encontrado!");
    if (!this.humanStats)
      throw new Error("Componente humanStats nao encontrado!");

    const value = this.humanStats.health / this.humanStats.maxHealth;
    const barWidth = this.transform.size.x * 2;
    const barHeight = 5;
    const barX = this.transform.position.x - barWidth / 2;
    const barY = this.transform.position.y - this.transform.size.x - 10;

    // Desenhar fundo da barra
    // ctx.fillStyle = "gray";
    // ctx.fillRect(barX, barY, barWidth, barHeight);

    // ctx.fillStyle = "red";
    // ctx.fillRect(barX, barY, value * barWidth, barHeight);

    // ctx.strokeStyle = "black";
    // ctx.strokeRect(barX, barY, barWidth, barHeight);
  }
}
