import { Clock } from "./Clock";
import { Renderer } from "./renderer";
import { Scene } from "./Scene";

export class Runtime {
  public clock: Clock;
  public renderer: Renderer;
  public scene: Scene;
  
  private static _instance?: Runtime;

  public static get instance() {
    if (!Runtime._instance) Runtime._instance = new Runtime();
    return Runtime._instance;
  }

  constructor() {
    this.update = this.update.bind(this);
    this.clock = new Clock(this.update);
    this.renderer = new Renderer();
    this.scene = new Scene();
  }

  public start() {
    this.scene.start();
    this.clock.start();
  }

  public update() {
    this.renderer.clear();
    this.scene.update();
    this.scene.render();
    this.renderer.drawBuffer();
  }
}
