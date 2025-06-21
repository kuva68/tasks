import { Platform } from 'react-native';
import { EnFilterType, EnSortType } from '../types/enums';
import dayjs from 'dayjs';
import { priorityOrder, productsPerPage } from '../constants';
import { FilterValues, ITask } from '../types/interfaces';
export const isIOS = Platform.OS === 'ios';

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      return func(...args);
    }, delay);
  };
}
export const capitalise = (str: string) =>
  str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);

export function validateName(name: string) {
  // Basic checks
  if (!name || typeof name !== 'string') {
    return {
      isValid: false,
      message: 'full_required',
    };
  }

  // Trim the name to remove extra spaces
  name = name.trim();

  if (name.length < 2 || name.length > 20) {
    return {
      isValid: false,
      message: 'each_name_part',
    };
  }

  const validNameRegex = /^[\p{L}\s'-]+$/u;
  if (!validNameRegex.test(name)) {
    return {
      isValid: false,
      message: 'name_can_only',
    };
  }

  return {
    isValid: true,
    message: '',
  };
}
export const uriToBlob = async (uri: string): Promise<Blob> => {
  const response = await fetch(uri);
  const blob = await response.blob();
  return blob;
};
export function removeSquareBrackets(text: string): string {
  return text.replace(/\[.*?\]/g, '');
}
export const makeFilteredSortPaginatedArr = (
  page: number,
  filterData: FilterValues,
  sortData: EnSortType,
  tasks: ITask[],
) => {
  const { status, priority, category } = filterData;
  return tasks
    .filter(
      task =>
        (status.includes(task.status) || !status.length) &&
        (priority.includes(task.priority) || !priority.length) &&
        (category.includes(task.category as EnFilterType) ||
          category.includes(EnFilterType.ALL) ||
          !category.length),
    )
    .sort((a, b) => {
      switch (sortData) {
        case EnSortType.DEDLINE:
          return dayjs(a.deadline).unix() - dayjs(b.deadline).unix();
        case EnSortType.PRIORITY:
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case EnSortType.STATUS:
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    })
    .slice(0, page * productsPerPage);
};
