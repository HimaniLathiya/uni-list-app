import { toast } from 'react-toastify';

const getDefaultOptions = () => {
  return {
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2000,
    closeOnClick: true,
    hideProgressBar: false
  };
};
const success = (message, options) => {
  if (!options) options = getDefaultOptions();
  return toast.success(message, options);
};
const error = (message, options) => {
  if (!options) options = getDefaultOptions();
  return toast.error(message, options);
};
const warn = (message, options) => {
  if (!options) options = getDefaultOptions();
  return toast.warn(message, options);
};
const info = (message, options) => {
  if (!options) options = getDefaultOptions();
  return toast.info(message, options);
};

export const toastrService = {
  success,
  error,
  warn,
  info,
};
