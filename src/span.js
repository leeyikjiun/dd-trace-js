const { Span } = require('opentracing');

class MySpan extends Span {
  constructor(fields) {
    super();

    this.context = fields.context;
    this.tracer = fields.tracer;
    this.operationName = fields.operationName;
    this.start = (new Date()).getTime() * 1000000;
  }

  _context() {
    return this.context;
  }

  _tracer() {
    return this.tracer;
  }

  _setOperationName(name) {
    this.operationName = name;
  }

  _setBaggageItem(key, value) {
    // eslint-disable-next-line no-underscore-dangle
    super._setBaggageItem(key, value);
  }

  _getBaggageItem(key) {
    // eslint-disable-next-line no-underscore-dangle
    super._getBaggageItem(key);
  }

  _addTags(keyValuePairs) {
    // eslint-disable-next-line no-underscore-dangle
    super._addTags(keyValuePairs);
  }

  _log(keyValuePairs) {
    // eslint-disable-next-line no-underscore-dangle
    super._log(keyValuePairs);
  }

  _finish(finishTime) {
    const end = finishTime || (new Date()).getTime() * 1000000;
    this.duration = end - this.start;
  }
}

module.exports = MySpan;
