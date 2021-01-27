import { serializeError, deserializeError, ErrorObject } from 'serialize-error';

export type ErrorMetaInfo = { [k: string]: unknown };

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
