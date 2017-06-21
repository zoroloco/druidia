//class for address fields.
import { State } from './state.model';

export class Address {
  address1: string;
  address2: string;
  city:     string;
  state:    State;
  zip:      number;
  country:  string;
}
