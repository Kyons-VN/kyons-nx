import { pick } from 'lodash-es';
import { Gift } from './gift';

class Promotion {
  isWon: boolean;
  claimCode?: string;
  gifts: Gift[];

  constructor({ isWon, claimCode, gifts }: { isWon: boolean; claimCode?: string; gifts: Gift[] }) {
    this.isWon = isWon;
    this.claimCode = claimCode;
    this.gifts = gifts;
  }

  static fromJson(json: any): Promotion {
    const _ = pick(json, ['isWon', 'claimCode', 'gifts']);
    _.isWon = json['is_won'] as boolean;
    _.claimCode = json['claim_code'];
    _.gifts = json['data'].map((jsonGift: any) => Gift.fromJson(jsonGift));
    return new Promotion(_);
  }
}

export { Promotion };
