Cypress.Commands.overwrite<'should', 'optional'>('should', function <
  T
>(this: Record<string, unknown>, originalFn: CallableFunction, subject: unknown, chainer: unknown, ...args: unknown[]) {
  const newArgs = args.map((a: unknown): unknown => {
    if (typeof a === 'string' && a.startsWith('@') && Object.keys(this).includes(a.slice(1))) {
      return this[a.slice(1)]
    }

    return a
  })

  return originalFn(subject, chainer, ...newArgs)
})
