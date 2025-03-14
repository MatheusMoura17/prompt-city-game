import { Component } from "../../engine/Component";
import { Vector2 } from "../../math/Vector2";
import { Transform } from "../Transform";
import { HumanStats } from "./HumanStats";

export class HumanMovement extends Component {
  private transform?: Transform;
  private humanStats?: HumanStats;
  private target: Vector2;

  private randomizeTarget() {
    if (!this.transform)
      throw new Error("Componente transform nao encontrado!");

    const aspect = window.innerWidth / window.innerHeight;
    const maxX = aspect*2;
    const maxY = 1*2;

    this.target = new Vector2(
      Math.random() * (maxX * 2) - maxX,
      Math.random() * (maxY * 2) - maxY
    );
  }

  private move() {
    if (!this.transform)
      throw new Error("Componente transform nao encontrado!");

    if (!this.humanStats)
      throw new Error("Componente HumanStats nao encontrado!");

    if (!this.humanStats.isAlive) return;

    const velocity = this.humanStats.speed * this.clock.deltaTime;
    this.transform.position = Vector2.moveTowards(
      this.transform.position,
      this.target,
      velocity
    );

    if (Vector2.distance(this.transform.position, this.target) < 1) {
      this.randomizeTarget();
    }
  }

  public start() {
    this.transform = this.gameObject.getComponent(Transform);
    this.humanStats = this.gameObject.getComponent(HumanStats);
    this.randomizeTarget();
  }

  public update(): void {
    this.move();
  }
}
