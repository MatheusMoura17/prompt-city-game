import { Component } from "../../engine/Component";
import { Vector1 } from "../../math/Vector1";
import { HumanStats } from "./HumanStats";

export class HumanHealthLoose extends Component {
  private humanStats?: HumanStats;

  public start() {
    this.humanStats = this.gameObject.getComponent(HumanStats);
  }

  private looseHealth() {
    if (!this.humanStats)
      throw new Error("Componente HumanStats nao encontrado");

    if (!this.humanStats.isAlive) return;

    const { health, looseHealthSpeed, looseHealthAmount } = this.humanStats;

    this.humanStats.health = Vector1.lerp(
      health,
      health - looseHealthAmount,
      looseHealthSpeed * this.clock.deltaTime
    );
  }

  public update(): void {
    this.looseHealth();

    if(!this.humanStats?.isAlive){
      this.gameObject.destroy();
    }
  }
}
