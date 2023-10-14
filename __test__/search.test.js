import { test, expect } from '@jest/globals';
import search from '../src/index';

const doc1 = { id: 'doc1', text: "I can't shoot straight unless I've had a pint!" };
const doc2 = { id: 'doc2', text: "Don't shoot shoot shoot that thing at me." };
const doc3 = { id: 'doc3', text: "I'm your shooter." };
const doc4 = { id: 'doc4', text: 'What is ashoot?' };
const docs = [doc1, doc2, doc3, doc4];

test('should find docs', () => {
  expect(search(docs, 'shoot')).toStrictEqual(['doc2', 'doc1']);
  expect(search(docs, 'pint')).toStrictEqual(['doc1']);
  expect(search(docs, 'pint!')).toStrictEqual(['doc1']);
});

test('should handle empty collection and not existed search target', () => {
  expect(search([], 'shoot')).toStrictEqual([]);
  expect(search(docs, 'not-existed')).toStrictEqual([]);
});
