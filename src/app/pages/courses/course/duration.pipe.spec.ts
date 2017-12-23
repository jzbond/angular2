import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  it('formats only minutes', () => {
    const pipe = new DurationPipe();
    expect(pipe.transform(1800)).toBe('30min');
  });

  it('formats hours and minutes', () => {
    const pipe = new DurationPipe();
    expect(pipe.transform(3660)).toBe('1h 1min');
  });
});
