import { EnFilterType, EnFilterValues } from '../types/enums';
import { FilterValues, Section } from '../types/interfaces';

export const productsPerPage = 6;
export const filterAttributes = {
  status: ['pending', 'completed'],
  priority: ['low', 'medium', 'high'],
  category: [EnFilterType.ALL, EnFilterType.PERSONAL, EnFilterType.WORK],
};
export const sections: Section[] = [
  {
    id: EnFilterValues.CATEGORY,
    title: 'CATEGORY',
    content: filterAttributes.category,
  },
  {
    id: EnFilterValues.PRIORITY,
    title: 'PRIORITY',
    content: filterAttributes.priority as FilterValues[EnFilterValues.PRIORITY],
  },

  {
    id: EnFilterValues.STATUS,
    title: 'STATUS',
    content: filterAttributes.status as FilterValues[EnFilterValues.STATUS],
  },
];
export const priorityOrder: Record<string, number> = {
  low: 0,
  medium: 1,
  high: 2,
};
