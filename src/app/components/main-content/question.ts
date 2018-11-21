import { TestCase } from "./test-case";

export class Question {

  public description: string;
  public constraint: string[];
  public time_limit: string;
  public testCase: TestCase[];
  public sampleCase: TestCase[];

  constructor(
    public qid: string,
    public title: string,
    public language: string  
  ) {
    this.description = '';
    this.constraint = [];
    this.time_limit = '';
    this.testCase = [];
    this.sampleCase = [];
  }

  setDetails(details) {

    this.title = details['title'];
    this.language = details['language'];
    this.qid = details['qid'];
    this.description = details['description'];
    this.constraint = details['constraint'];
    this.time_limit = details['time_limit'];
    
    for(let key in details['testCase']) {
      let io = details['testCase'][key];
      this.testCase[key] = new TestCase(io['input'], io['output']);
    }

    for(let key in details['sampleCase']) {
      let io = details['sampleCase'][key];
      this.sampleCase[key] = new TestCase(io['input'], io['output']);
    }
  }

  addNewConstraint() {
    this.constraint.push( '' );
  }
  deleteConstraint(constraint: string) {
    let index = this.constraint.indexOf(constraint);
    if(index != -1)
      this.constraint.splice(index, 1);
  }

  addSampleCase() {
    this.sampleCase.push( new TestCase('', '') );
  }
  
  deleteSampleCase(testCase) {
    let index = this.sampleCase.indexOf(testCase);
    if(index != -1)
      this.sampleCase.splice(index, 1);
  }

  addTestCase() {
    this.testCase.push( new TestCase('', '') );
  }
  
  deleteTestCase(testcase) {
    let index = this.testCase.indexOf(testcase);
    if(index != -1)
      this.testCase.splice(index, 1);
  }
}