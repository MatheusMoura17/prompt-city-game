import { Runtime } from "../engine/Runtime";
import { CrateFactory } from "../factories/CrateFactory";
import { HumanFactory } from "../factories/HumanFactory";
import "./style.css";

CrateFactory.create("crate");


setInterval(()=>{
  HumanFactory.create("josh");
},100)


Runtime.instance.start();
