import { EnFilterType, EnFilterValues } from './enums';

export interface ITask {
  uri: string;
  id: string;
  title: string;
  description?: string;
  status: 'pending' | 'completed';
  priority: 'low' | 'medium' | 'high';
  deadline: string;
  category: 'Personal' | 'Work';
}

export type SectionId = keyof FilterValues;
export interface FilterValues {
  [EnFilterValues.CATEGORY]: EnFilterType[];
  [EnFilterValues.PRIORITY]: ITask['priority'][];
  [EnFilterValues.STATUS]: ITask['status'][];
}
export interface Section {
  id: EnFilterValues;
  title: string;
  content: FilterValues[EnFilterValues];
}
