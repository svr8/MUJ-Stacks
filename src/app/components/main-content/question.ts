export class Question {

  public description: string;
  public constraints: string[];
  public time_limit: string;
  public sampleInput: string;
  public sampleOutput: string;

  constructor(
    public id: string,
    public title: string,
    public language: string    
  ) {}
}