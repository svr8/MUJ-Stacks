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
    this.constraint = [];
    this.testCase = [];
    this.sampleCase = [];
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