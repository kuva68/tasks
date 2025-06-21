import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native';
import MainLayout from '../../components/MainLayout';
import { getFontSize, scaledSize, scaledY } from '../../utils/scaleSize';
import { useNavigation } from '@react-navigation/native';
import { Searchbar } from '../../components/SearchBar';
import TaskCard from '../../components/ProductCard';
import { debounce } from '../../utils';
import { setSearch } from '../../store/settings/settingsSlice';
import store from '../../store/store';
import { productsPerPage } from '../../constants';
import { theme } from '../../theme/themes';
import { ListEmptyComponent } from './components/emptyList';
import { useFetchTasksQuery } from '../../store/tasks/tasksApi';
import dayjs from 'dayjs';

const setSearchString = (searchString: string) => {
  store.dispatch(setSearch(searchString));
};
const searchTasksByString = debounce(setSearchString, 300);
export const SearchScreen: React.FC = () => {
  const navigation = useNavigation();
  const [value, setValue] = useState('');
  const [page, setPage] = useState(1);
  const { data: tasks = [], isLoading } = useFetchTasksQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  useEffect(() => {
    searchTasksByString(value);
  }, [value]);
  const sortAndFilteredData = useMemo(() => {
    if (value === '') {
      return [];
    }
    return tasks
      .filter(
        el =>
          el.title.toLowerCase().includes(value.toLowerCase()) ||
          el.description?.toLowerCase()?.includes(value?.toLowerCase()),
      )
      .sort((a, b) => {
        return dayjs(a.deadline).unix() - dayjs(b.deadline).unix();
      })
      .slice(0, page * productsPerPage);
  }, [tasks, page, value]);
  const handleLoadMore = () => {
    if (page * productsPerPage < tasks?.length) {
      setPage(prev => prev + 1);
    }
  };
  useEffect(() => {
    setPage(1);
  }, [tasks]);
  return (
    <MainLayout isDisable={true} isTopEdge>
      {isLoading && (
        <ActivityIndicator
          size="large"
          color={theme.colors.violet}
          style={styles.indicator}
        />
      )}
      <View style={styles.header}>
        <Searchbar value={value} setValue={setValue} />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.title}>cancel</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={sortAndFilteredData}
        renderItem={({ item }) => <TaskCard item={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          <ListEmptyComponent
            title={value.length < 3 ? 'Search' : 'Not found'}
          />
        }
      />
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: getFontSize(28),
    fontWeight: '600',
    color: theme.colors.success,
    marginTop: scaledSize(16),
  },
  emptyContainer: { flex: 1, alignItems: 'center', marginTop: scaledY(100) },
  header: {
    paddingHorizontal: scaledSize(16),
    flexDirection: 'row',
    height: scaledSize(44),
    gap: scaledSize(8),
    alignItems: 'center',
    paddingBottom: scaledSize(6),
    marginTop: scaledY(12),
  },
  indicator: {
    position: 'absolute',
    top: scaledY(150),
    alignSelf: 'center',
    zIndex: 10000,
  },
  border: {
    borderColor: '#DDDDDD',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    paddingHorizontal: scaledSize(16),
    flexDirection: 'row',
    height: scaledSize(44),
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  between: { justifyContent: 'space-between' },
  separator: {
    width: scaledSize(343),
    height: 1,
    backgroundColor: '#D4D4D4',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: scaledY(8),
  },
  title: {
    fontSize: getFontSize(16),
    fontWeight: '400',
    color: '#171717',
  },

  listContent: {
    paddingBottom: 100,
    paddingHorizontal: scaledSize(16),
    gap: scaledSize(8),
    paddingTop: scaledY(12),
  },
});
