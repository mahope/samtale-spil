import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach, expect, it, vi } from 'vitest';

afterEach(() => { vi.unstubAllEnvs(); vi.resetModules(); });

it('links to Natsnak with an age label on the Danish website', async () => {
  vi.stubEnv('APP_BUILD', '');
  vi.resetModules();
  const { SiteFooter } = await import('@/components/site/SiteFooter');
  const html = renderToStaticMarkup(<SiteFooter />);
  expect(html).toContain('href="https://natsnak.dk/" rel="noopener"');
  expect(html).toContain('samtalekort og ønsker for to (18+)');
});

it('omits Natsnak from the app footer', async () => {
  vi.stubEnv('APP_BUILD', '1');
  vi.resetModules();
  const { SiteFooter } = await import('@/components/site/SiteFooter');
  expect(renderToStaticMarkup(<SiteFooter />)).not.toMatch(/natsnak/i);
});
