import React, { useReducer, useEffect, useCallback } from 'react';
import UAParser from 'ua-parser-js';

import { Error } from './Error';
import { Success } from './Success';
import { Dropzone } from './Dropzone';

import { Result } from '../lib/Result';
import { AppContext } from '../lib/AppContext';

import { reducer } from '../lib/reducer';
import { initialState } from '../lib/initialState';

import 'typeface-roboto';
import './App.scss';

const { myAPI } = window;

export const App = (): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const isDarwin = () => {
    const ua = new UAParser();
    return ua.getOS().name === 'Mac OS';
  };

  const afterConvert = (result: Result): void => {
    if (result.type === 'failed') {
      dispatch({ type: 'error', value: true });
    } else {
      dispatch({ type: 'success', value: true });
    }

    dispatch({ type: 'loading', value: false });
    dispatch({ type: 'message', value: result.msg });
    dispatch({ type: 'desktop', value: result.desktop });
  };

  const convert = useCallback(
    async (filepath: string): Promise<void> => {
      const mime = await myAPI.mimecheck(filepath);

      if (!mime || !mime.match(/png/)) {
        dispatch({ type: 'loading', value: false });

        const message = mime ? mime : 'Unknown';
        dispatch({ type: 'message', value: `Invalid format: ${message}` });
        dispatch({ type: 'error', value: true });

        return;
      }

      if (state.ico) {
        const result = await myAPI.mkIco(filepath);
        afterConvert(result);
      } else {
        const result = await myAPI.mkIcns(filepath);
        afterConvert(result);
      }
    },
    [state.ico]
  );

  const onClickBack = () => {
    dispatch({ type: 'drag', value: false });
    dispatch({ type: 'error', value: false });
    dispatch({ type: 'success', value: false });
    dispatch({ type: 'message', value: '' });
  };

  useEffect(() => {
    myAPI.menuOpen(async (_e, filepath) => {
      if (!filepath) return;

      dispatch({ type: 'loading', value: true });
      await convert(filepath);
    });

    return (): void => {
      myAPI.removeMenuOpen();
    };
  }, [convert]);

  useEffect(() => {
    myAPI.setDesktop((_e, arg) => dispatch({ type: 'desktop', value: arg }));

    return (): void => {
      myAPI.removeDesktop();
    };
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch, convert, onClickBack }}>
      <div className={isDarwin() ? 'container_darwin' : 'container'}>
        {!state.success && !state.error ? (
          <Dropzone />
        ) : state.success ? (
          <Success />
        ) : (
          <Error />
        )}
      </div>
    </AppContext.Provider>
  );
};
