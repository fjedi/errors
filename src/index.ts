import { serializeError, deserializeError, ErrorObject } from 'serialize-error';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ErrorMetaInfo = { [k: string]: any };

export type ErrorProps = {
  modelName?: string;
  group?: string;
  status?: number;
  originalError?: Error;
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
    if (props.modelName) {
      this.modelName = props.modelName;
    }
    if (props.group) {
      this.group = props.group;
    }
    if (props.meta) {
      this.data = props.meta;
    }
    this.status = props.status || 500;
  }

  status: number;

  group?: string;

  modelName?: string;

  data?: ErrorMetaInfo;

  originalError?: Error;

  serialize(): ErrorObject {
    return DefaultError.serialize(this);
  }

  static serialize(error: Error | DefaultError): ErrorObject {
    return serializeError(error);
  }

  static deserialize(error: ErrorObject): Error {
    return deserializeError(error);
  }
}
