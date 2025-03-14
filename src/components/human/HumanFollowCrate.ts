import { Component } from "../../engine/Component";
import { Vector2 } from "../../math/Vector2";
import { Transform } from "../Transform";
import { HumanStats } from "./HumanStats";

export class HumanFollowCrate extends Component {
  private crateTransform?: Transform;
  private transform?: Transform;
  private humanStats?: HumanStats;

  private move() {
    if (!this.transform)
      throw new Error("Componente transform nao encontrado!");

    if (!this.crateTransform)
      throw new Error("Componente transform da caixa nao encontrado!");

    if (!this.humanStats)
      throw new Error("Componente HumanStats nao encontrado!");

    if (!this.humanStats.isAlive) return;

    const velocity = this.humanStats.speed * this.clock.deltaTime;
    this.transform.position = Vector2.moveTowards(
      this.transform.position,
      this.crateTransform.position,
      velocity
    );
  }

  public start() {
    const crate = this.scene.findGameObjectByName("crate");
    if(crate){
      this.crateTransform = crate.getComponent(Transform);
    }
    this.transform = this.gameObject.getComponent(Transform);
    this.humanStats = this.gameObject.getComponent(HumanStats);
  }

  public update(): void {
    this.move();
  }
}
