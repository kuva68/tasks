import { createApi } from '@reduxjs/toolkit/query/react';
import firestore from '@react-native-firebase/firestore';

import { ITask } from '../../types/interfaces';
import auth from '@react-native-firebase/auth';
const currentUser = auth().currentUser;

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: async () => ({ data: {} }),
  tagTypes: ['Tasks'],
  endpoints: builder => ({
    fetchTasks: builder.query<ITask[], void>({
      async queryFn() {
        try {
          const user = auth().currentUser;
          if (!user) return { error: { message: 'User not authenticated' } };
          const snapshot = await firestore()
            .collection('tasks')
            .where('userId', '==', user?.uid)
            .get();
          const tasks: ITask[] = snapshot?.docs?.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as ITask[];
          return { data: tasks ?? [] };
        } catch (error) {
          return { error: { message: (error as Error).message } };
        }
      },
      providesTags: ['Tasks'],
    }),

    addTask: builder.mutation<null, ITask>({
      async queryFn(task) {
        const user = auth().currentUser;
        if (!user) return { error: { message: 'User not authenticated' } };
        try {
          await firestore()
            .collection('tasks')
            .doc()
            .set({ ...task, userId: user?.uid });

          return { data: null };
        } catch (error) {
          return { error: { message: (error as Error).message } };
        }
      },
      invalidatesTags: ['Tasks'],
    }),

    updateTask: builder.mutation<null, ITask>({
      async queryFn(task) {
        const user = auth().currentUser;
        const { id, ...dataToUpdate } = task;
        const sanitizedData = JSON.parse(
          JSON.stringify({ ...dataToUpdate, userId: user?.uid }),
        );

        if (!user) return { error: { message: 'User not authenticated' } };
        try {
          await firestore().collection('tasks').doc(id).update(sanitizedData);

          return { data: null };
        } catch (error) {
          return { error: { message: (error as Error).message } };
        }
      },
      invalidatesTags: ['Tasks'],
    }),

    deleteTask: builder.mutation<null, string>({
      async queryFn(id) {
        const user = auth().currentUser;
        if (!user) return { error: { message: 'User not authenticated' } };
        try {
          const res = await firestore().collection('tasks').doc(id).delete();
          console.log(res, '==res delete');
          return { data: null };
        } catch (error) {
          console.log(JSON.stringify(error), '==delete task');
          return { error: { message: (error as Error).message } };
        }
      },
      invalidatesTags: ['Tasks'],
    }),

    subscribeTasks: builder.query<ITask[], void>({
      queryFn: () => ({ data: [] }),
      async onCacheEntryAdded(
        _,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        await cacheDataLoaded;
        const unsubscribe = firestore()
          .collection('tasks')
          .where('userId', '==', currentUser?.uid)
          .onSnapshot(snapshot => {
            const tasks: ITask[] = snapshot?.docs?.map(doc => ({
              id: doc.id,
              ...doc.data(),
            })) as ITask[];
            updateCachedData(() => tasks ?? []);
          });
        await cacheEntryRemoved;
        unsubscribe();
      },
    }),
  }),
});

export const {
  useFetchTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useSubscribeTasksQuery,
} = tasksApi;
