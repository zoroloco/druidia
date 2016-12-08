import { sayHello } from "./exportme";
import { addNums } from "./exportme";
//import { * } from "./student" as Student;

import { isEmpty } from "underscore";


interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person : Person) {
    console.log("Hello, " + person.firstName + " " + person.lastName);
}

//var user = new Student("Jane", "M.", "Jones");
//greeter(user);

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    document.write(__filename);
    elt.innerText = isEmpty(name)+" ---- "+sayHello(name);
}

console.log(addNums(1,2));
showHello("greeting","f");
