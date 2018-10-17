import { MonthNameImpurePipe } from './month-name-impure.pipe';

describe('MonthNameImpurePipe', () => {
  it('create an instance', () => {
    const pipe = new MonthNameImpurePipe('en-en');
    expect(pipe).toBeTruthy();
  });
});
