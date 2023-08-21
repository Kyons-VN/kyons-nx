import { MockTestStatus } from '@share-utils/domain';

interface IMockTestItem {
  id: string;
  createdDate: Date;
  status: MockTestStatus;
  score?: number;
  index?: number;
}

export { IMockTestItem, MockTestStatus };
