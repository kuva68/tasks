import React from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { getFontSize, scaledSize, scaledY } from '../utils/scaleSize';

import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme/themes';
import { Label } from './Label';
import Button from './Button';
import { ITask } from '../types/interfaces';
import { EnScreens } from '../types/enums';
import { useDispatch } from 'react-redux';
import { setActiveTask } from '../store/tasks/tasksSlice';
import TextField from './TextField';
import dayjs from 'dayjs';
import { useDeleteTaskMutation } from '../store/tasks/tasksApi';
import { Icons } from '../constants/icons';

interface TaskCardProps {
  item: ITask;
}

const TaskCard: React.FC<TaskCardProps> = ({ item }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const onPress = () => {
    dispatch(setActiveTask(item));
    navigation.navigate(EnScreens.TASK_EDIT);
  };
  const [deleteTask] = useDeleteTaskMutation();
  const onDeletePress = () => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            deleteTask(item.id);
          },
        },
      ],
      { cancelable: true },
    );
  };
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return theme.colors.red;
      case 'medium':
        return theme.colors.violet;

      default:
        return theme.colors.green;
    }
  };
  const isDeadLineCome = dayjs(item.deadline).isBefore(dayjs(), 'day');
  return (
    <TouchableOpacity disabled style={[styles.card]}>
      <View style={styles.topConteiner}>
        <View>
          {item.uri ? (
            <Image
              progressiveRenderingEnabled
              resizeMode="cover"
              style={[styles.imgBg]}
              source={{ uri: item?.uri }}
              defaultSource={require('../assets/images/startBg.png')}
            />
          ) : (
            <Icons.Task
              width={scaledSize(120)}
              height={scaledSize(120)}
              fill={theme.colors.gray40}
            />
          )}
          <View style={styles.lableView}>
            {item.category === 'Personal' && (
              <Label color={theme.colors.violet} text="Personal" />
            )}
            {item.category === 'Work' && (
              <Label color={theme.colors.green} text="Work" />
            )}
            {item.status === 'completed' && (
              <Label
                color={theme.colors.yellow}
                text="Completed"
                style={styles.right}
              />
            )}
            {item.status === 'pending' && (
              <Label
                color={theme.colors.blue}
                text="Pending"
                style={styles.right}
              />
            )}
          </View>
        </View>
        <View style={styles.bottom}>
          <Text
            allowFontScaling={false}
            ellipsizeMode="tail"
            style={[styles.topText]}
            numberOfLines={1}
          >
            {item.title}
          </Text>
          <TextField
            textStyle={{
              ...styles.price,
              color: getPriorityColor(item.priority),
            }}
            titleStyle={{
              ...styles.price,
              color: getPriorityColor(item.priority),
            }}
            title="Priority"
            text={item.priority}
            style={styles.fieldText}
          />
          <TextField
            isDeadLine={isDeadLineCome}
            textStyle={{
              ...styles.price,
              color: getPriorityColor(item.priority),
            }}
            titleStyle={{
              ...styles.price,
              color: getPriorityColor(item.priority),
            }}
            title="Deadline"
            text={dayjs(item.deadline).format('DD MMMM YY  HH:mm')}
          />
          <View style={styles.row}>
            <Button
              text="Delete"
              onPress={onDeletePress}
              style={{ ...styles.btn, backgroundColor: theme.colors.danger }}
            />
            <Button text="Edit" onPress={onPress} style={styles.btn} />
          </View>
        </View>
      </View>

      <Text
        allowFontScaling={false}
        ellipsizeMode="tail"
        numberOfLines={3}
        style={[styles.bottomText]}
      >
        {item.description || 'No description provided.'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    // height: scaledSize(273),
    overflow: 'hidden',
    padding: scaledSize(8),
  },
  bottomText: {
    color: '#000000',
    fontWeight: '400',
    fontSize: getFontSize(14),
    width: scaledSize(327),
    marginTop: scaledY(4),
  },
  row: {
    width: scaledSize(200),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: scaledSize(8),
  },
  btn: { height: scaledSize(30), width: scaledSize(70) },
  fieldText: { width: scaledSize(190) },
  topConteiner: { flexDirection: 'row', gap: 8 },
  lableView: {
    gap: 4,
    position: 'absolute',
    top: 8,
    left: 8,
    width: scaledSize(104),
    height: scaledSize(104),
  },

  topText: {
    color: '#000000',
    fontWeight: '600',
    width: scaledSize(190),
    fontSize: getFontSize(16),
  },
  fullText: { width: scaledSize(155) },
  bottom: {
    gap: 4,
    paddingHorizontal: scaledSize(4),
    paddingVertical: scaledSize(0),
    overflow: 'hidden',
    width: scaledSize(200),
  },
  price: {
    color: '#444444',
    fontSize: getFontSize(13),
    lineHeight: getFontSize(20),
    fontWeight: '600',
  },
  right: { position: 'absolute', right: 2, bottom: 2 },
  imgBg: {
    width: scaledSize(120),
    height: scaledSize(120),
    backgroundColor: '#e7e7e7',
  },
  iconContainer: {
    position: 'absolute',
    top: scaledSize(4),
    right: scaledSize(4),
    width: scaledSize(24),
    height: scaledSize(24),
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
});

export default TaskCard;
