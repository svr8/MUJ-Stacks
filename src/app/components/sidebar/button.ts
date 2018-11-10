export class Button {

  constructor(public label: string, 
              public target: string){
              
  }


  select() {
    console.log(this.label + ' selected.');
  }

  deselect() {
    console.log(this.label + ' deselected');
  }


}