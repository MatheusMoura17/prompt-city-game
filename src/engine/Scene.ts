import { GameObject } from "./GameObject";

export class Scene {
  private gameObjects: GameObject[] = [];
  private isStarted = false;

  public addGameObject(gameObject: GameObject) {
    gameObject.id = this.gameObjects.push(gameObject);

    if (this.isStarted) {
      gameObject.start();
    }
  }

  public findGameObjectByName(name: string) {
    return this.gameObjects.find((go) => go.name === name);
  }

  public removeGameObject(gameObject: GameObject) {
    const index = gameObject.id;
    this.gameObjects.splice(index, 1);
  }

  public start() {
    this.isStarted = true;
    this.gameObjects.forEach((gameObject) => gameObject.start());
  }

  public update() {
    this.gameObjects.forEach((gameObject) => gameObject.update());
  }

  public render() {
    this.gameObjects.forEach((gameObject) => gameObject.render());
  }
}
