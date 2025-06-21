import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterValues } from '../../types/interfaces';
import { EnFilterType, EnSortType } from '../../types/enums';
import { RootState } from '../type';

interface SettingsState {
  selectedFilter: FilterValues;
  selectedSort: EnSortType;
  searchStr: string;
}
const initialState: SettingsState = {
  selectedFilter: {
    status: [],
    priority: [],
    category: [EnFilterType.ALL],
  },
  selectedSort: EnSortType.DEDLINE,
  searchStr: '',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<FilterValues>) => {
      state.selectedFilter = action.payload;
    },
    setSort: (state, action: PayloadAction<EnSortType>) => {
      state.selectedSort = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.searchStr = action.payload;
    },
  },
});
export const selectFilter = (state: RootState) => state.settings.selectedFilter;
export const selectSort = (state: RootState) => state.settings.selectedSort;
export const selectSearch = (state: RootState) => state.settings.searchStr;
export const { setFilter, setSort, setSearch } = settingsSlice.actions;
export default settingsSlice.reducer;
