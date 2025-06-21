import {useCallback, useState} from 'react';
import {ObjectSchema} from 'yup';
import {ObjectShape, TypeOfShape} from 'yup/lib/object';

type FormSchema<T extends ObjectShape> = ObjectSchema<
  T,
  Record<string, unknown>,
  TypeOfShape<T>
>;

export function useForm<T extends ObjectShape>(
  schema: FormSchema<T>,
  defaultValue?: Partial<TypeOfShape<T>>,
): [TypeOfShape<T>, (update: Partial<TypeOfShape<T>>) => void, boolean] {
  const [state, setState] = useState({...schema.getDefault(), ...defaultValue});
  const updateForm = useCallback((update: Partial<TypeOfShape<T>>) => {
    //@ts-ignore
    setState(base => ({...base, ...update}));
  }, []);

  return [state, updateForm, schema.isValidSync(state)] as [
    TypeOfShape<T>,
    (update: Partial<TypeOfShape<T>>) => void,
    boolean,
  ];
}
