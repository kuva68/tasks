import EventEmitter from 'events';
import {EnMessagePreset} from '../../types/enums';

// Initialization
const eventEmitter = new EventEmitter();
eventEmitter.setMaxListeners(50);
// Export the module
export const showMessage = (
  type: EnMessagePreset,
  message: string,
  duration: number = 4000,
) => {
  eventEmitter.emit('message', type, message, +duration);
};
export const hideMessage = () => {
  eventEmitter.emit('hideMessage');
};
export default eventEmitter;
