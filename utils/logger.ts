/**
 * Development logger utility
 * Only logs in development mode, silent in production
 */

const isDev = process.env.NODE_ENV === 'development'

export const logger = {
  /**
   * Log general information (development only)
   */
  log: (...args: any[]) => {
    if (isDev) {
      console.log(...args)
    }
  },

  /**
   * Log warnings (development only)
   */
  warn: (...args: any[]) => {
    if (isDev) {
      console.warn(...args)
    }
  },

  /**
   * Log errors (always logged, even in production)
   */
  error: (...args: any[]) => {
    console.error(...args)
  },

  /**
   * Log debug information (development only)
   */
  debug: (...args: any[]) => {
    if (isDev) {
      console.debug(...args)
    }
  },

  /**
   * Log info with a label (development only)
   */
  info: (label: string, ...args: any[]) => {
    if (isDev) {
      console.log(`[${label}]`, ...args)
    }
  },
}
