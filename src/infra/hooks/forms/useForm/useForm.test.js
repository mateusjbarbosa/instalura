import { renderHook, act } from '@testing-library/react-hooks';
import { useForm } from './index';

describe('useForm()', () => {
  describe('when user types', () => {
    test('change the value', () => {
      const { result } = renderHook(() => useForm({
        initialValues: {
          name: 'somename',
        },
      }));

      const initialValues = { name: 'somename' };
      
      expect(result.current.values).toEqual(initialValues);

      const event = {
        target: {
          getAttribute: () => 'name',
          value: 'othername',
        },
      };

      act(() => {
        result.current.handleChange(event);
      });

      expect(result.current.values).toEqual({ name: 'othername' });
    });
  });
});
