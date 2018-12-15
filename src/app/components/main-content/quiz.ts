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

  getStartTime(): string { 
    return this.extractTime(this.startDate);
  }
  getEndTime(): string {
    return this.extractTime(this.endDate);
  }
  getStartDate(): string {
    return this.extractDate(this.startDate);
  }
  getEndDate(): string {
    return this.extractDate(this.endDate);
  }

  extractTime(fullDate: string): string {
    let dateOb = new Date(fullDate);
    let seconds = dateOb.getUTCSeconds();
    return dateOb.getUTCHours() + ':' +
           dateOb.getUTCMinutes() + ':' +
           (seconds<10 ? '0' : '') + dateOb.getUTCSeconds();
  }

  extractDate(fullDate: string): string {
    let dateOb = new Date(fullDate);
    return dateOb.getUTCDate() + '/' +
           dateOb.getUTCMonth() + '/' +
           dateOb.getUTCFullYear() ;
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