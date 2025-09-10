import { describe, it, expect } from 'vitest';
import { sommaire } from '../lib/sommaire';

describe('sommaire data', () => {
  it('should be a valid object', () => {
    expect(typeof sommaire).toBe('object');
    expect(sommaire).not.toBeNull();
  });

  it('should have a "chapitres" property which is an array', () => {
    expect(Array.isArray(sommaire.chapitres)).toBe(true);
  });

  it('should have at least one chapitre', () => {
    expect(sommaire.chapitres.length).toBeGreaterThan(0);
  });

  it('each chapitre should have a "titre" property', () => {
    sommaire.chapitres.forEach(chapitre => {
      expect(typeof chapitre.titre).toBe('string');
    });
  });
});
