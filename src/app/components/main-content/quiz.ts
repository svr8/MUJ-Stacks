export class Quiz {

  public description: string;
  public duration: string;
  public questions: string[];

  constructor(
    public id: string,
    public title: string,
    public date: string  
  ) {
    this.description = '';
    this.questions = [];
  }

  setDetails(details) {
    this.title = details['title'];
    this.duration = details['duration'];
    this.id = details['id'];
    this.description = details['description'];
    this.date = details['date'];
    
    for(let key in details['qidList']) 
      this.questions.push(details['qidList'][key]);
  }

  addNewQID() {
    this.questions.push( '' );
  }
  deleteQID(qid: string) {
    let index = this.questions.indexOf(qid);
    if(index != -1)
      this.questions.splice(index, 1);
  }

}