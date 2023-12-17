import { type JSX } from 'react';

export interface ChoiceValue<Value> {
  value: Value;
  icon: JSX.Element | null;
  label: string;
}
