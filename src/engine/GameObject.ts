import { Component } from "./Component";
import { Runtime } from "./Runtime";
import { GameObjectBuilder } from "./GameObjectBuilder";

export class GameObject {
  public id = -1;

  constructor(public name: string, public components: Component[]) {
    components.forEach((component) => (component.gameObject = this));
    Runtime.instance.scene.addGameObject(this);
  }

  public destroy(){
    this.components = [];
    Runtime.instance.scene.removeGameObject(this);
  }

  public addComponent(component: Component) {
    this.components.push(component);
    component.gameObject = this;
  }

  public getComponent<T extends Component>(
    type: new (...args: any[]) => T
  ): T | undefined {
    return this.components.find((component) => component instanceof type) as
      | T
      | undefined;
  }

  public start() {
    this.components.forEach((component) => component.start());
  }

  public update() {
    this.components.forEach((component) => component.update());
  }

  public render() {
    this.components.forEach((component) => component.render());
  }

  public static builder() {
    return new GameObjectBuilder();
  }
}
