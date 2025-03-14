import { Component } from "./Component";
import { GameObject } from "./GameObject";

export class GameObjectBuilder {
  private name: string = "GameObject";
  private components: Component[] = [];

  public setName(name: string): this {
    this.name = name;
    return this;
  }

  public addComponent(component: Component): this {
    this.components.push(component);
    return this;
  }

  public build(): GameObject {
    return new GameObject(this.name, this.components);
  }
}