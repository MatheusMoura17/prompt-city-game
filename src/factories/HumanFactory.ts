import { HumanColorRandomizer } from "../components/human/HumanColorRandomizer";
import { HumanHealthLoose } from "../components/human/HumanHealthLoose";
// import { HumanHealthRenderer } from "../components/human/HumanHealthRenderer";
import { HumanMovement } from "../components/human/HumanMovement";
import { HumanRenderer } from "../components/human/HumanRenderer";
import { HumanStats } from "../components/human/HumanStats";
import { Transform } from "../components/Transform";
import { GameObject } from "../engine/GameObject";
import { Vector2 } from "../math/Vector2";

export class HumanFactory {
  static create(name: string) {
    const size = new Vector2(10, 10);
    const rotation = 0;
    const position = Vector2.zero;

    const human = GameObject.builder()
      .setName(name)
      .addComponent(new Transform(position, size, rotation))
      .addComponent(new HumanStats())
      .addComponent(new HumanColorRandomizer())
      .addComponent(new HumanMovement())
      // .addComponent(new HumanHealthLoose())
      .addComponent(new HumanRenderer())
      // .addComponent(new HumanHealthRenderer())
      .build();

    return human;
  }
}
