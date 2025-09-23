import { useRef } from 'react';

const useUserAudio = () => {
  const mediaRecorder = useRef<MediaRecorder>();
  const audioChunks = useRef<Blob[]>();

  const record = () => {
    navigator.mediaDevices
      .getUserMedia({
        audio: {
          sampleRate: 16000,
        },
      })
      .then((stream: MediaStream) => {
        mediaRecorder.current = new MediaRecorder(stream);

        audioChunks.current = [];

        mediaRecorder.current.ondataavailable = (event) => {
          audioChunks.current?.push(event.data);
        };

        mediaRecorder.current.start();
      })
      .catch((err) => {
        console.error(`An error occurred: ${err}`);
      });
  };

  const stop = async (): Promise<string | ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      if (!mediaRecorder.current) return reject('NOT_RECORDED');

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, {
          type: 'audio/webm',
        });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = () => {
          resolve(reader.result || '');
        };
      };

      mediaRecorder.current.stop();
    });
  };

  return { record, stop };
};
export default useUserAudio;
