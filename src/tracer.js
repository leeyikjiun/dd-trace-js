const { Tracer } = require('opentracing');

const MySpan = require('./span');
const MySpanContext = require('./span_context');

class MyTracer extends Tracer {
  constructor(fields) {
    super();

    this.service = fields.service;
    this.type = 'web';
  }

  _startSpan(name, fields) {
    let spanContext;
    if (fields.references) {
      const reference = fields.references[0];
      const parentSpanContext = reference.referencedContext();
      spanContext = new MySpanContext({
        traceId: parentSpanContext.traceId,
        service: parentSpanContext.service,
        type: parentSpanContext.type,
        parentId: parentSpanContext.parentId,
      });
    }
    const span = new MySpan({
      context: spanContext,
      tracer: this,
      operationName: name,
    });
    return span;
  }

  // eslint-disable-next-line class-methods-use-this
  _inject(spanContext, format, carrier) {
    Object.assign(carrier, {
      'Trace-Id': spanContext.traceId,
      'Span-Id': spanContext.spanId,
    });
  }

  _extract(format, carrier) {
    return new MySpanContext({
      traceId: carrier['trace-id'],
      service: this.service,
      type: this.type,
      parentId: carrier['span-id'],
    });
  }
}

module.exports = MyTracer;
