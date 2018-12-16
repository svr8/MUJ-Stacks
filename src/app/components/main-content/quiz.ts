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
    let time = this.extractTime(this.startDate);
    return time == 'NaN:NaN:NaN' ? '' : time;
  }
  getEndTime(): string {
    let time = this.extractTime(this.endDate);
    return time == 'NaN:NaN:NaN' ? '' : time;

  }
  getStartDate(): string {
    let date = this.extractDate(this.startDate);
    return date == 'NaN/NaN/NaN' ? '' : date;
  }
  getEndDate(): string {
    let date = this.extractDate(this.endDate);
    return date == 'NaN/NaN/NaN' ? '' : date;
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