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
    this.duration = '';
    this.questions = [];
    this.formatDuration();    
  }

  setDetails(details) {
    this.title = details['title'];
    this.duration = details['duration'];
    this.id = details['id'];
    this.description = details['description'];
    
    this.date = details['date'];
    this.formatDuration();
    
    for(let key in details['questions']) 
      this.questions.push(details['questions'][key]);
  }

  formatDuration() {
    let colonCount = 0;
    for(let index=0; index<this.duration.length;index++)
      if(this.duration.charAt(index)==':') colonCount++;
   
    for(let c=0; c<colonCount; c++)
      this.duration = this.duration + ':00';
   
    if(this.duration.charAt(0)==':')
      this.duration = this.duration.substring(1);
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