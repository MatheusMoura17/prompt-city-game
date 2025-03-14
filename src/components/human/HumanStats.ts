import { Component } from "../../engine/Component";

export enum EHumanState {
  idle = "idle",
}

export class HumanStats extends Component {
  public color: number[] = [];
  public borderColor: number[] = [];
  public coins = 0;
  public speed = Math.random();
  public looseHealthSpeed = 5;
  public looseHealthAmount = 1;
  public maxHealth = 100;
  public health = this.maxHealth;
  public maxHunger = 100;
  public hunger = this.maxHunger;
  public state: EHumanState = EHumanState.idle;

  public get isAlive() {
    return this.health > 0;
  }
}
