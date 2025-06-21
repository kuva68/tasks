import React, { useEffect, useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  UIManager,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { getFontSize, scaledSize, scaledY } from '../../utils/scaleSize';
import { theme } from '../../theme/themes';

import { ModalHeader } from './components/ModalHeader';
import { isIOS } from '../../utils';
import Checkbox from './components/Checkbox';
import Button from '../Button';
import { EnFilterType, EnFilterValues } from '../../types/enums';
import { FilterValues } from '../../types/interfaces';
import { selectFilter } from '../../store/settings/settingsSlice';
import { sections } from '../../constants';
import MenuItem from '../MenuItem';
//const aggregateData = debounce(aggregateProducts, 700);

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const FilterModal = ({
  onDismis,
  handleFilter,
}: {
  onDismis: () => void;
  handleFilter: (filter: any) => void;
}) => {
  const filterData = useSelector(selectFilter);
  const [filter, setDataInFilter] = useState<FilterValues>({
    status: ['pending'],
    priority: ['medium'],
    category: [EnFilterType.ALL],
  });

  useEffect(() => {
    setDataInFilter(filterData);
  }, [filterData]);

  const setFilterData = (
    prop: EnFilterValues,
    value: FilterValues[typeof prop],
  ) => {
    setDataInFilter(prev => ({ ...prev, [prop]: value }));
  };
  function getSectionValues<K extends keyof FilterValues>(
    key: K,
  ): FilterValues[K] {
    return filter[key];
  }
  return (
    <View style={styles.container}>
      <ModalHeader onDismis={onDismis} title="Filter" />

      <ScrollView
        contentContainerStyle={styles.main}
        showsVerticalScrollIndicator={false}
      >
        {sections.map(section => {
          const values = getSectionValues(section.id);
          return (
            <View key={section.id} style={styles.sectionView}>
              <MenuItem isOpen={true} title={section.id} />

              <View style={styles.itemsContainer}>
                {section.content.map(elem => {
                  //@ts-ignore
                  const isChecked = values.includes(elem);
                  const updated = isChecked
                    ? values.filter(el => el !== elem)
                    : [...values, elem];
                  return (
                    <Checkbox
                      square
                      key={elem}
                      text={elem}
                      onToggle={() => {
                        setFilterData(
                          section.id,
                          updated as typeof section.content,
                        );
                      }}
                      isChecked={isChecked}
                    />
                  );
                })}
              </View>
            </View>
          );
        })}
      </ScrollView>

      <Button
        style={styles.btn}
        text={'Show tasks'}
        onPress={() => handleFilter(filter)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: isIOS ? scaledY(50) : 0,
    height: scaledY(812),
  },
  indicator: {
    marginTop: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  sectionView: { marginBottom: scaledY(8) },
  main: {
    width: '100%',
    paddingHorizontal: scaledSize(16),
    paddingBottom: 100,
  },
  top: { gap: scaledY(20), marginBottom: scaledY(32) },
  content: {
    paddingHorizontal: scaledSize(16),
    gap: scaledSize(12),
    width: scaledSize(375),
  },
  itemsContainer: {
    gap: scaledY(6),
    paddingLeft: scaledSize(15.5),
  },
  btn: {
    backgroundColor: theme.colors.black,
    width: scaledSize(343),
    alignSelf: 'center',
    marginBottom: scaledY(46),
    height: scaledSize(48),
  },
  flatList: {
    width: scaledSize(375),
  },
  paddingBottom: { paddingBottom: scaledSize(100) },
  btnText: { color: theme.colors.gray100 },
  left: { gap: 4 },
  colorSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  priceOld: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: '#444444',
    textDecorationColor: '#444444',
  },

  rightText: { textAlign: 'right' },
  price: {
    fontSize: getFontSize(16),
    lineHeight: getFontSize(20),
    color: '#BE2C4B',
    fontWeight: '600',
  },
  sizesSection: {
    gap: scaledSize(8),
  },
  sizesRow: {
    flexDirection: 'row',
    gap: scaledSize(8),
  },
  priceRow: { flexDirection: 'row', gap: 8 },
  chevron: {
    transform: [{ rotate: '90deg' }],
  },
  chevronExpanded: {
    transform: [{ rotate: '-90deg' }],
  },

  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scaledSize(12),
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  sectionContent: {
    paddingVertical: scaledSize(12),
    paddingHorizontal: scaledSize(4),
    gap: scaledSize(8),
  },
  characteristicRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: scaledSize(4),
  },
  characteristicLabel: {
    color: '#666666',
    flex: 1,
  },
  characteristicValue: {
    flex: 1,
    textAlign: 'right',
  },
  descriptionText: {
    lineHeight: scaledSize(20),
    color: '#333333',
  },
});

export default FilterModal;
