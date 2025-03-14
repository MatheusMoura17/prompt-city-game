import { Component } from "../../engine/Component";
import { HumanStats } from "./HumanStats";

const colors = [
  { body: [1.0, 0.0, 0.0, 1.0], border: [0.5, 0.0, 0.0, 1.0] }, // Vermelho
  { body: [0.0, 1.0, 0.0, 1.0], border: [0.0, 0.5, 0.0, 1.0] }, // Verde
  { body: [0.0, 0.0, 1.0, 1.0], border: [0.0, 0.0, 0.5, 1.0] }, // Azul
  { body: [1.0, 1.0, 0.0, 1.0], border: [0.5, 0.5, 0.0, 1.0] }, // Amarelo
  { body: [0.5, 0.0, 0.5, 1.0], border: [0.3, 0.0, 0.3, 1.0] }, // Roxo
  { body: [1.0, 0.5, 0.0, 1.0], border: [0.5, 0.3, 0.0, 1.0] }, // Laranja
  { body: [1.0, 0.75, 0.8, 1.0], border: [0.8, 0.5, 0.6, 1.0] }, // Rosa
  { body: [0.5, 0.25, 0.0, 1.0], border: [0.3, 0.15, 0.0, 1.0] }, // Marrom
  { body: [0.0, 0.0, 0.0, 1.0], border: [0.1, 0.1, 0.1, 1.0] }, // Preto
  { body: [1.0, 1.0, 1.0, 1.0], border: [0.9, 0.9, 0.9, 1.0] }, // Branco
];

export class HumanColorRandomizer extends Component {
  private humanStats?: HumanStats;

  private getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  public start() {
    this.humanStats = this.gameObject.getComponent(HumanStats);

    if (!this.humanStats)
      throw new Error("Componente humanStats nao encontrado!");

    const { body, border } = this.getRandomColor();

    this.humanStats.color = body;
    this.humanStats.borderColor = border;
  }
}
