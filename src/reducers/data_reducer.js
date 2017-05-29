import { primarySubcategories, secondarySubcategories } from './subcategories_list';

const INITIAL_STATE = {
  primarySubcategories,
  secondarySubcategories
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    default:
      return state;
  }
}
