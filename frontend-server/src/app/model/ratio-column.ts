import { HasEnterpriseId } from "./interface/has-enterprise-id";

export class RatioColumn implements HasEnterpriseId{
  id:           number;
  enterpriseId: number;
  name:         string;
  dayTypeId:    number;
}
