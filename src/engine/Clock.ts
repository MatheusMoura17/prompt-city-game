export class Clock {
  private time = 0;
  private lastTime = 0;
  public deltaTime = 0;

  constructor(private loopCallback: () => void) {
    this.loop = this.loop.bind(this);
  }

  public start() {
    this.loop();
  }

  public loop() {
    this.time = performance.now();
    this.deltaTime = (this.time - this.lastTime) / 1000;
    this.lastTime = this.time;

    this.loopCallback();

    requestAnimationFrame(this.loop);
  }
}
