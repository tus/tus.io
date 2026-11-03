import { getCollection } from 'astro:content'
import { defineMiddleware } from 'astro:middleware'
import {
  getLegacyRedirects,
  getLegacyRedirectTarget,
} from './lib/getLegacyRedirects.ts'

/** Keeps historical routes testable in dev; static builds emit the corresponding HTML files. */
export const onRequest = defineMiddleware(async (context, next) => {
  if (!import.meta.env.DEV) return next()
  const redirects = getLegacyRedirects(await getCollection('blog'))
  const target = getLegacyRedirectTarget(context.url.pathname, redirects)
  return target ? context.redirect(`/${target}`, 302) : next()
})
