import { useState, useEffect } from 'react';

interface IConfirmExit {
  needConfirm: boolean;
  setNeedConfirm: React.Dispatch<React.SetStateAction<boolean>>;
}

const userConfirmation = (e: any) => {
  if (!(process.env.NODE_ENV === 'development')) {
    e.preventDefault();
    e.returnValue = '';
  }
};

const useConfirmExit = (value: boolean = false): IConfirmExit => {
  const [needConfirm, setNeedConfirm] = useState(value);

  useEffect(() => {
    if (needConfirm) {
      window.addEventListener('beforeunload', userConfirmation);

      return () => {
        window.removeEventListener('beforeunload', userConfirmation);
      };
    }

    return () => {};
  }, [needConfirm]);

  return { needConfirm, setNeedConfirm };
};

export default useConfirmExit;
