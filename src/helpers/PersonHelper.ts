import { PersonInterface } from "../appBase/interfaces/Membership"
import { EnvironmentHelper } from "./EnvironmentHelper"

export class PersonHelper {
  static person: PersonInterface;

  static getPhotoUrl(person: PersonInterface) {
    return person?.photo ? EnvironmentHelper.ContentRoot + person?.photo : "/images/sample-profile.png";
  }
}

