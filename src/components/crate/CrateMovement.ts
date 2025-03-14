import { Component } from "../../engine/Component";
import { Vector2 } from "../../math/Vector2";
import { Transform } from "../Transform";

export class CrateMovement extends Component {
  private transform?: Transform;
  private angle: number = 40; // Ângulo para calcular a posição no círculo
  private radius: number = 1; // Raio do círculo (ajustável conforme necessário)
  private center: Vector2 = new Vector2(0, 0); // Posição central do círculo

  private move() {
    if (!this.transform)
      throw new Error("Componente transform nao encontrado!");

    const velocity = 0.8 * this.clock.deltaTime;

    // Atualizar o ângulo para dar movimento circular
    this.angle += velocity / this.radius; // O fator de velocidade ajusta a rapidez da rotação

    // Calcular nova posição em coordenadas cartesianas
    const x = this.center.x + this.radius * Math.cos(this.angle);
    const y = this.center.y + this.radius * Math.sin(this.angle);

    // Atualizar posição da caixa
    this.transform.position = new Vector2(x, y);
  }

  public start() {
    this.transform = this.gameObject.getComponent(Transform);
  }

  public update(): void {
    this.move();
  }
}
