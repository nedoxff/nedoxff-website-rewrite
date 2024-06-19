/* adapted from nemtel/progress-promise */

type ProgressHandler = (progress: number) => void;
export class ProgressPromise<T> extends Promise<T> {
  listeners: ProgressHandler[];

  constructor(
    executor: (
      resolve: (value: T | PromiseLike<T>) => void,
      reject: (reason?: any) => void,
      progress: ProgressHandler,
    ) => T,
  ) {
    const setProgress = (value: number) =>
      Promise.resolve().then(() =>
        this.listeners.forEach((listener) => listener(value)),
      );

    super((resolve, reject) =>
      executor(
        (value) => {
          setProgress(100);
          resolve(value);
        },
        reject,
        (value) => {
          try {
            setProgress(value);
          } catch (error) {
            reject(error);
          }
        },
      ),
    );
    this.listeners = [];
  }

  public progress(handler: ProgressHandler) {
    this.listeners.push(handler);
    return this;
  }
}
