import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BsArrowRepeat } from 'react-icons/bs';

import 'typeface-roboto';
import './styles.scss';

const { ipcRenderer } = window;

const App = (): JSX.Element => {
  const [onDrag, setOnDrag] = useState(false);
  const [loading, setLoading] = useState(false);

  const preventDefault = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    preventDefault(e);
    setOnDrag(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>): void => {
    preventDefault(e);
    setOnDrag(false);
  };

  const onDrop = async (e: React.DragEvent<HTMLDivElement>): Promise<void> => {
    preventDefault(e);
    setOnDrag(false);

    if (e.dataTransfer) {
      setLoading(true);

      const file = e.dataTransfer.files[0];
      const result = await ipcRenderer.invoke('dropped-file', file.path);

      if (result) setLoading(false);
    }
  };

  return (
    <div
      className="container"
      onDrop={onDrop}
      onDragEnter={onDragOver}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}>
      {loading ? (
        <div className="loading">
          <BsArrowRepeat size={64} className="spinner" />
        </div>
      ) : (
        <div className={onDrag ? 'initial drag' : 'initial'}>
          <div>
            <svg
              width="64"
              height="48"
              viewBox="0 0 64 48"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M52 24C45.3787 24 40 29.3733 40 36C40 42.6267 45.3787 48 52 48C58.6213 48 64 42.6267 64 36C64 29.3733 58.6213 24 52 24ZM58.6667 36C58.6667 36.7364 58.0697 37.3333 57.3333 37.3333H56C54.5272 37.3333 53.3333 38.5272 53.3333 40V41.3333C53.3333 42.0697 52.7364 42.6667 52 42.6667C51.2636 42.6667 50.6667 42.0697 50.6667 41.3333V40C50.6667 38.5272 49.4728 37.3333 48 37.3333H46.6667C45.9303 37.3333 45.3333 36.7364 45.3333 36C45.3333 35.2636 45.9303 34.6667 46.6667 34.6667H48C49.4728 34.6667 50.6667 33.4728 50.6667 32V30.6667C50.6667 29.9303 51.2636 29.3333 52 29.3333C52.7364 29.3333 53.3333 29.9303 53.3333 30.6667V32C53.3333 33.4728 54.5272 34.6667 56 34.6667H57.3333C58.0697 34.6667 58.6667 35.2636 58.6667 36ZM20.0441 37.3333C16.0436 37.3333 13.6631 32.8687 15.8924 29.547L19.0187 24.8888C20.2669 23.029 22.8347 22.6266 24.592 24.0154C26.384 25.4316 29.0084 24.9814 30.2259 23.0489L31.3386 21.2826C32.8787 18.838 36.4448 18.8442 37.9764 21.2941C38.9341 22.826 38.6782 24.7899 37.6607 26.2827C36.4925 27.9966 35.6338 29.9153 35.1464 31.9703C34.4743 34.8044 32.2488 37.3333 29.336 37.3333H20.0441ZM36.6117 43.9629C37.4794 45.629 36.3961 48 34.5176 48H5C2.23857 48 0 45.7614 0 43V5C0 2.23858 2.23858 0 5 0H53.6667C56.4281 0 58.6667 2.23858 58.6667 5V16.5959C58.6667 18.2151 57.0286 19.3368 55.4404 19.0214C54.2787 18.7907 53.3333 17.8187 53.3333 16.6343V10.3333C53.3333 7.57191 51.0948 5.33333 48.3333 5.33333H10.3333C7.57191 5.33333 5.33333 7.57191 5.33333 10.3333V37.6667C5.33333 40.4281 7.57191 42.6667 10.3333 42.6667H34.5839C35.4446 42.6667 36.2141 43.1994 36.6117 43.9629ZM14.6667 18.6667C12.4587 18.6667 10.6667 16.8773 10.6667 14.6667C10.6667 12.4587 12.4587 10.6667 14.6667 10.6667C16.8747 10.6667 18.6667 12.4587 18.6667 14.6667C18.6667 16.8773 16.8747 18.6667 14.6667 18.6667Z" />
            </svg>
          </div>
          <div className="message">
            Drop a <span>PNG</span> file here...
          </div>
        </div>
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
