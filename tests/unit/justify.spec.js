/**
 * justify.spec.js js file created by Tamara G. Mack on 19-Oct-19 for
 * tamaramack.github.io
 */
import justify from '@/pages/playground/js/justify';

describe('justifyJS', () => {
  it('expected string and right length', () => {
    expect(justify('i o u', 'i o u'.length + 2)).toBe('i  o  u');
  });

  it('handling null as string', () => {
    expect(justify(null, 0)).toBe('');
  });

  it('handling undefined as string', () => {
    expect(justify(undefined, 1)).toBe('');
  });

  it('handling NaN as number', () => {
    expect(justify('Is NaN can be a number too?', Number.NaN)).toBe('');
  });

  it('handling null as number', () => {
    expect(justify('How about null?', null)).toBe('How about null?');
  });

  it('handling undefined as number', () => {
    expect(justify('Or undefined?', undefined)).toBe('');
  });

  it('handling non declarative undefined as number', () => {
    expect(justify('No, actual undefined',)).toBe('');
  });

  it('handling string as number', () => {
    expect(justify('A string can be a number too', '40'))
      .toBe('A   string   can   be   a   number   too');
  });

  it('no spaces available in string', () => {
    expect(justify('word', 50)).toBe('word');
  });

  it('leading and trailing spaces available in string', () => {
    expect(justify('     word    thus     ', 10)).toBe('word  thus');
  });
});
