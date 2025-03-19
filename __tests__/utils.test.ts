import { cn } from '@/lib/utils';

describe('cn utility', () => {
  it('merges class names correctly', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('handles conditional classes', () => {
    const condition = true;
    expect(cn('class1', condition && 'class2')).toBe('class1 class2');
    expect(cn('class1', !condition && 'class2')).toBe('class1');
  });

  it('handles multiple types of inputs', () => {
    expect(cn('class1', { 'class2': true, 'class3': false })).toBe('class1 class2');
    expect(cn(['class1', 'class2'])).toBe('class1 class2');
  });

  it('resolves Tailwind CSS conflicts', () => {
    expect(cn('px-4 py-2', 'p-6')).toBe('p-6');
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
  });
}); 