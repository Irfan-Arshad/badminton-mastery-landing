export function track(event: string, payload?: Record<string, unknown>) {
  if (process.env.NODE_ENV === 'development') {
    // Placeholder analytics hook
    // eslint-disable-next-line no-console
    console.debug('[analytics]', event, payload || {});
  }
}

