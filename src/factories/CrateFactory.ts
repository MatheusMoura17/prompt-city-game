import { CrateMovement } from "../components/crate/CrateMovement";
import { CrateRenderer } from "../components/crate/CrateRenderer";
import { Transform } from "../components/Transform";
import { GameObject } from "../engine/GameObject";
import { Vector2 } from "../math/Vector2";

export class CrateFactory {
  static create(name: string) {
    const size = new Vector2(10, 10);
    const rotation = 0;
    const position = Vector2.zero;

    const human = GameObject.builder()
      .setName(name)
      .addComponent(new Transform(position, size, rotation))
      .addComponent(new CrateMovement())
      .addComponent(new CrateRenderer())
      .build();

    return human;
  }
}
