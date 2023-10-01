declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}


declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;

declare interface DOMEvent<T extends EventTarget> extends Event {
  readonly target: T
}

