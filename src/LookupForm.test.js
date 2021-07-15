import React from 'react';
import renderer from 'react-test-renderer';
import LookupForm from './LookupForm';

it('renders correctly', () => {
  const tree = renderer.create(<LookupForm />).toJSON();
  expect(tree).toMatchSnapshot();
});

/**
 * expect();
 * .toBe(n);
 * .toEqual(n);
 * .not.toBe(n);
 * .toBeDefined();
 * .toBeFalsy();
 * .toBeGreaterThanOrEqual(n);
 * .toMatch('string');
 * .toContain(value);
 * .toThrow(error);
 * done(); to wait for callback results.
 * use return
 */