import { string, object } from 'yup';
export const formSchema = object({
  uri: string().url().optional().default(''),
  title: string().required(),
  description: string().optional(),
  status: string()
    .oneOf(['pending', 'completed'])
    .required()
    .default('pending'),
  priority: string().oneOf(['low', 'medium', 'high']).required(),
  deadline: string().required(),
  category: string().oneOf(['Personal', 'Work']).required(),
}).required();
