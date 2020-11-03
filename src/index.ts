export type ErrorMetaInfo = { [k: string]: any };

export type ErrorProps = {
  modelName?: string;
  group?: string;
  status?: number;
  originalError?: any;
  meta?: ErrorMetaInfo;
};

export class DefaultError extends Error {
  constructor(message: string, props: ErrorProps = {}) {
    super(message); // 'Error' breaks prototype chain here
    this.name = new.target.prototype.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    //
    if (props.originalError instanceof Error) {
      this.stack = props.originalError.stack;
      this.originalError = props.originalError;
    }
    this.modelName = props.modelName || '';
    this.group = props.group || '';
    this.status = props.status || 500;
    this.data = props.meta || {};
  }

  group: string | undefined;

  modelName: string | undefined;

  status: number;

  data: ErrorMetaInfo;

  originalError: Error | void;
}
