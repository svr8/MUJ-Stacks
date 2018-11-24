import { FirebaseService } from "src/app/services/firebase.service";

export class AccountBrief {

  public qid: string[];

  constructor(public name: string,
              public email: string,
              public account_type: string,
              ) {}

  loadAdditionalDetails() {

  }
}