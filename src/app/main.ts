import { Runtime } from "../engine/Runtime";
import { HumanFactory } from "../factories/HumanFactory";
import "./style.css";

for (let i = 0; i < 100; i++) {
  HumanFactory.create("Josh");
}

Runtime.instance.start();
