import { Clock } from "./Clock";
import { GameObject } from "./GameObject";
import { Renderer } from "./renderer";
import { Runtime } from "./Runtime";
import { Scene } from "./Scene";

export class Component {
  public gameObject: GameObject;
  public renderer: Renderer;
  public clock: Clock;
  public scene: Scene;

  constructor() {
    const runtime = Runtime.instance;
    this.renderer = runtime.renderer;
    this.clock = runtime.clock;
    this.scene = runtime.scene;
  }

  start() {}
  update() {}
  render() {}
}
