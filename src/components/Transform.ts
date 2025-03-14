import { Component } from "../engine/Component";
import { Vector2 } from "../math/Vector2";

export class Transform extends Component {
  constructor(
    public position: Vector2,
    public size: Vector2,
    public rotation: number
  ) {
    super();
  }
}
