import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProductCard from '../../components/ProductCard';
import { scaledSize, scaledY } from '../../utils/scaleSize';
import FilterModal from '../../components/Filter/Index';
import SortType from '../../components/SortType';
import { EnScreens } from '../../types/enums';
import Header from '../../components/Header';
import CategoryModal from '../../components/CategoryModal';
import MainLayout from '../../components/MainLayout';
import { FilterValues } from '../../types/interfaces';
import { useFetchTasksQuery } from '../../store/tasks/tasksApi';
import { theme } from '../../theme/themes';
import {
  selectFilter,
  selectSort,
  setFilter,
} from '../../store/settings/settingsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ListEmptyComponent } from '../../components/listEmptyComponent';
import { setActiveTask } from '../../store/tasks/tasksSlice';
import { productsPerPage } from '../../constants';
import { makeFilteredSortPaginatedArr } from '../../utils';

export const TaskListScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { data: tasks = [], isLoading } = useFetchTasksQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [page, setPage] = useState(1);
  const [sortModeModalVisible, setSortModeModalVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const filterData = useSelector(selectFilter);
  const sortData = useSelector(selectSort);
  const sortAndFilteredData = useMemo(() => {
    return makeFilteredSortPaginatedArr(page, filterData, sortData, tasks);
  }, [tasks, sortData, filterData, page]);
  useEffect(() => {
    setPage(1);
  }, [tasks]);
  const handleFilter = useCallback(
    (filterValues: FilterValues) => {
      dispatch(setFilter(filterValues));
      setFilterVisible(false);
    },
    [dispatch],
  );

  const onEndReach = async () => {
    if (page * productsPerPage < tasks.length) {
      setPage(prev => prev + 1);
    }
  };

  const deleteActiveTask = () => {
    dispatch(setActiveTask(null));
  };
  return (
    <MainLayout isDisable isTopEdge>
      {isLoading && (
        <ActivityIndicator
          size="large"
          color={theme.colors.yellow}
          style={styles.indicator}
        />
      )}
      <View style={styles.header}>
        <Header
          title={'Task List'}
          onFilterPress={() => {
            setFilterVisible(true);
          }}
          onSortPress={() => {
            setSortModeModalVisible(true);
          }}
          onAddPress={() => {
            deleteActiveTask();
            navigation.navigate(EnScreens.TASK_EDIT);
          }}
          onSearchPress={() => {
            navigation.navigate(EnScreens.SEARCH);
          }}
        />
        <View style={styles.separator} />
      </View>

      <FlatList
        data={sortAndFilteredData}
        renderItem={({ item }) => <ProductCard item={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        onEndReachedThreshold={1.5}
        onEndReached={onEndReach}
        keyExtractor={(item, i) => item?.title + i}
        ListEmptyComponent={ListEmptyComponent}
      />
      {tasks.length > 0 && (
        <ListEmptyComponent
          style={styles.flBtn}
          textStyle={styles.flBtnText}
          size={60}
        />
      )}
      <CategoryModal
        isvisible={sortModeModalVisible}
        onDismis={() => {
          setSortModeModalVisible(false);
        }}
      >
        <SortType
          onDismiss={() => {
            setSortModeModalVisible(false);
          }}
        />
      </CategoryModal>
      <CategoryModal
        //@ts-ignore
        propagateSwipe
        panResponderThreshold={2}
        isvisible={filterVisible}
        onDismis={() => {
          setFilterVisible(false);
        }}
      >
        <FilterModal
          handleFilter={handleFilter}
          onDismis={() => setFilterVisible(false)}
        />
      </CategoryModal>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  flBtn: {
    position: 'absolute',
    bottom: scaledY(120),
    right: scaledSize(16),
    alignItems: 'center',
    marginTop: 0,
    flex: 0,
  },
  flBtnText: {
    fontSize: scaledSize(12),
    fontWeight: '600',
    marginTop: scaledY(0),
  },
  gap12: {
    gap: scaledY(12),
  },
  indicator: {
    position: 'absolute',
    top: scaledY(812 / 2 - 20),
    alignSelf: 'center',
    zIndex: 10000,
  },

  header: { marginBottom: scaledY(12), paddingHorizontal: scaledSize(16) },
  separator: {
    width: scaledSize(343),
    height: 1,
    backgroundColor: '#D4D4D4',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: scaledY(12),
    marginTop: scaledY(8),
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  count: {
    fontSize: 14,
    color: '#666',
  },
  row: {
    gap: scaledSize(16),
  },
  listContent: {
    paddingBottom: 100,
    paddingHorizontal: scaledSize(16),
    gap: scaledSize(16),
  },
});
