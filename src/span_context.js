const { SpanContext } = require('opentracing');

class MySpanContext extends SpanContext {
  constructor(fields) {
    super();

    this.traceId = fields.traceId;
    this.service = fields.service;
    this.type = fields.type;
    this.parentId = fields.parentId;
  }
}

module.exports = MySpanContext;
