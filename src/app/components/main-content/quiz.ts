export class Quiz {

  public description: string;
  public questions: string[];

  constructor(
    public id: string,
    public title: string,
    public startDate: string,
    public endDate: string
  ) {
    this.description = '';
    this.questions = [];
  }

  setDetails(details) {
    this.title = details['title'];
    this.id = details['id'];
    this.description = details['description'];

    this.startDate = details['startDate'];
    this.endDate = details['endDate'];
    
    for(let key in details['questions']) 
      this.questions.push(details['questions'][key]);
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