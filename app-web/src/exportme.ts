export function sayHello(name: string){
  console.log("Name="+name);
  return `Hello dude from ${name}`;
}

export function addNums(num0: number , num1: number){
  console.log("Adding: "+num0+" + "+num1);
  return num0 + num1;
}
