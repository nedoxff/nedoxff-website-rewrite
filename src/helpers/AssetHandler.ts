import { ProgressPromise } from "./ProgressPromise";

export type AssetPreloader = (data: string) => Promise<unknown>;

export default class AssetHandler {
  private _innerMap: Map<string, string>;
  private _preloader: AssetPreloader;
  private _data: any;

  constructor(data: any, preloader: AssetPreloader) {
    this._innerMap = new Map<string, string>();
    this._preloader = preloader;
    this._data = data;

    for (const key of Object.keys(data)) {
      this._innerMap.set(
        key
          .split(/(\\|\/)/g)
          .pop()!
          .replace(/\.[^/.]+$/, ""),
        this._data[key],
      );
    }
  }

  // todo: no error handling here!
  public load(): ProgressPromise<void> {
    const keys = Object.keys(this._data);

    return new ProgressPromise((resolve, reject, progress) => {
      const preload = (index: number) =>
        this._preloader(this._data[keys[index]]).then(() => {
          index++;
          progress((100 / keys.length) * index);
          if (index <= keys.length - 1) preload(index);
          else resolve();
        });

      if (keys.length !== 0) preload(0);
      else resolve();
    });
  }

  public get(name: string) {
    return this._innerMap.get(name);
  }
}
