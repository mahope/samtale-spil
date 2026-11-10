import { cleanup, render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { DeviceStoreButtons, detectStoreDevice } from '@/components/site/DeviceStoreButtons';
import { STORE_TEXTS_DA } from '@/components/site/StoreButtons';

const props = { texts: STORE_TEXTS_DA, tone: 'papir' as const, links: { ios: 'https://apps.apple.com/dk/app/id6825365746', android: null } };
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllEnvs(); });

describe('store devices', () => {
  it.each([
    ['Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)', 5, 'ios'],
    ['Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X)', 5, 'ios'],
    ['Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15) Version/18.0 Safari/605.1.15', 5, 'ios'],
    ['Mozilla/5.0 (Linux; Android 14; Pixel 8)', 5, 'android'],
    ['Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15)', 0, 'desktop'],
    ['unknown', 0, 'desktop'],
  ])('detects %s', (ua, touch, expected) => {
    expect(detectStoreDevice(ua, touch)).toBe(expected);
  });
  it.each(['ios', 'android', 'desktop'])('renders the right promotion for %s', (device) => {
    vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue(device === 'ios' ? 'iPhone' : device === 'android' ? 'Android' : 'Desktop');
    render(<DeviceStoreButtons {...props} />);
    expect(screen.queryByRole('link', { name: 'Hent i App Store' }) !== null).toBe(device !== 'android');
    expect(screen.queryByText('Kommer snart på Google Play') !== null).toBe(device !== 'ios');
  });
  it('renders the live link and Android notice on the server', () => {
    expect(renderToString(<DeviceStoreButtons {...props} />)).toContain(props.links.ios);
    expect(renderToString(<DeviceStoreButtons {...props} />)).toContain('Kommer snart på Google Play');
  });
  it('keeps coming soon when neither store is live', () => {
    render(<DeviceStoreButtons {...props} links={{ ios: null, android: null }} />);
    expect(screen.getByText(STORE_TEXTS_DA.soon)).not.toBeNull();
    expect(screen.queryByRole('link')).toBeNull();
  });
  it('omits promotions from APP_BUILD=1', async () => {
    vi.stubEnv('APP_BUILD', '1');
    vi.resetModules();
    const { StoreButtons } = await import('@/components/site/StoreButtons');
    expect(renderToString(<StoreButtons />)).toBe('');
  });
});
