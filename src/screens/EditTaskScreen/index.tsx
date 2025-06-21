import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
  ActivityIndicator,
} from 'react-native';
import storage from '@react-native-firebase/storage';
import MainLayout from '../../components/MainLayout';
import { getFontSize, scaledSize, scaledY } from '../../utils/scaleSize';
import { useNavigation } from '@react-navigation/native';
import Input from '../../components/Input';
import { useForm } from '../../hooks/useForm';
import { formSchema } from '../../constants/formShemas';
import MenuItem from '../../components/MenuItem';
import Checkbox from '../../components/Filter/components/Checkbox';
import Button from '../../components/Button';
import DatePicker from 'react-native-date-picker';
import auth from '@react-native-firebase/auth';
import {
  useAddTaskMutation,
  useUpdateTaskMutation,
} from '../../store/tasks/tasksApi';
import { useSelector } from 'react-redux';
import { selectActiveTask } from '../../store/tasks/tasksSlice';
import { Icons } from '../../constants/icons';
import { theme } from '../../theme/themes';
import { launchImageLibrary } from 'react-native-image-picker';
import { requestCameraPermission } from '../../services/permission';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

export const EditTaskScreen: React.FC = () => {
  const navigation = useNavigation();
  const [form, setForm] = useForm(formSchema);
  const [open, setOpen] = React.useState(false);
  const [addTask] = useAddTaskMutation();
  const [isLoadig, setIsLoading] = useState(false);
  const activeTask = useSelector(selectActiveTask);
  useEffect(() => {
    if (activeTask) {
      setForm(activeTask);
    }
  }, [activeTask, setForm]);
  const [updateTask] = useUpdateTaskMutation();
  const onSubmit = async () => {
    if (isLoadig) return;

    formSchema
      .validate(form)
      .then(() => {
        if (activeTask) {
          updateTask(form);
        } else {
          addTask(form);
          // FirestoreApi.addTask(form);
        }
        navigation.goBack();
      })
      .catch(err => {
        Alert.alert('Validation Error', err.message);
      });
  };
  const onImagePickPress = async () => {
    try {
      setIsLoading(true);
      await requestCameraPermission();
      const result = await launchImageLibrary({ mediaType: 'photo' });

      if (result.didCancel || !result.assets?.[0]) return;

      const asset = result.assets[0];
      const { uri, fileName } = asset;
      const fileUri =
        Platform.OS === 'android' && !uri?.startsWith('file://')
          ? `file://${uri ?? ''}`
          : uri ?? '';
      const currentUser = auth().currentUser;
      if (!currentUser || !uri) return;
      const reference = storage().ref(`${currentUser.uid}/${fileName}`);

      await reference.putFile(fileUri);
      const downloadURL = await reference.getDownloadURL();

      setForm({ uri: downloadURL });
    } catch (error) {
      console.error('Error picking image:', JSON.stringify(error));
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <MainLayout isDisable={true} isTopEdge>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          {/* <Text style={styles.title}>{'cancel'}</Text> */}
          <Icons.ChevronLeft
            width={scaledSize(28)}
            height={scaledSize(28)}
            color={theme.colors.gray100}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={styles.main}
        showsVerticalScrollIndicator={false}
      >
        <Input
          value={form.title}
          description="Title"
          setValue={value => setForm({ title: value })}
        />
        <Input
          value={form.description}
          description="Description"
          setValue={value => setForm({ description: value })}
        />

        <MenuItem isOpen={true} title="Status" />
        <Checkbox
          square
          text="Pending"
          onToggle={() => {
            setForm({
              status: form.status === 'pending' ? 'completed' : 'pending',
            });
          }}
          isChecked={form.status === 'pending'}
        />
        <Checkbox
          square
          text="Completed"
          onToggle={() => {
            setForm({
              status: form.status === 'pending' ? 'completed' : 'pending',
            });
          }}
          isChecked={form.status === 'completed'}
        />
        <MenuItem isOpen={true} title="Priority" />
        <Checkbox
          square
          text="Low"
          onToggle={() => {
            setForm({
              priority: form.priority === 'low' ? '' : 'low',
            });
          }}
          isChecked={form.priority === 'low'}
        />
        <Checkbox
          square
          text="Medium"
          onToggle={() => {
            setForm({
              priority: form.priority === 'medium' ? '' : 'medium',
            });
          }}
          isChecked={form.priority === 'medium'}
        />
        <Checkbox
          square
          text="High"
          onToggle={() => {
            setForm({
              priority: form.priority === 'high' ? '' : 'high',
            });
          }}
          isChecked={form.priority === 'high'}
        />
        <MenuItem isOpen={true} title="Category" />
        <Checkbox
          square
          text="Personal"
          onToggle={() => {
            setForm({
              category: form.category === 'Personal' ? '' : 'Personal',
            });
          }}
          isChecked={form.category === 'Personal'}
        />
        <Checkbox
          square
          text="Work"
          onToggle={() => {
            setForm({
              category: form.category === 'Work' ? '' : 'Work',
            });
          }}
          isChecked={form.category === 'Work'}
        />

        <>
          <Button
            style={styles.btn}
            text="Set deadline"
            onPress={() => setOpen(true)}
          />
          <DatePicker
            modal
            minimumDate={new Date()}
            open={open}
            date={
              form?.deadline &&
              form.deadline.lengh > 6 &&
              new Date(form?.deadline)
                ? new Date(form?.deadline)
                : new Date()
            }
            onConfirm={date => {
              setOpen(false);
              setForm({ deadline: date.toISOString() });
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </>
        {form.uri && (
          <Animated.Image
            entering={FadeIn}
            exiting={FadeOut}
            source={{ uri: form.uri }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
        <Button
          style={{ ...styles.btn, backgroundColor: theme.colors.violet }}
          text="Pick image"
          onPress={onImagePickPress}
        />
        <Button
          style={{ ...styles.btn, backgroundColor: theme.colors.success }}
          text={activeTask ? 'Edit task' : 'Add task'}
          onPress={onSubmit}
        />
      </ScrollView>
      {isLoadig && (
        <ActivityIndicator
          size="large"
          color={theme.colors.violet}
          style={styles.indicator}
        />
      )}
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: 343,
    height: 140,
    alignSelf: 'center',
    borderRadius: 8,
  },
  btn: { height: scaledY(48) },
  main: {
    width: '100%',
    paddingHorizontal: scaledSize(16),
    paddingBottom: 100,
    gap: scaledSize(16),
    paddingTop: scaledY(12),
  },

  header: {
    paddingHorizontal: scaledSize(16),
    flexDirection: 'row',
    height: scaledSize(44),
    gap: scaledSize(8),
    alignItems: 'center',
    paddingBottom: scaledSize(6),
    // marginTop: scaledY(12),
  },
  backBtn: { paddingVertical: scaledSize(8), zIndex: 1000 },
  indicator: {
    position: 'absolute',
    top: scaledY(250),
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
