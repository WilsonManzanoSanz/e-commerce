import { createSelector } from 'reselect';

const selectUi = state => state.ui;

export const selectIsMobile = createSelector(
  [selectUi],
  mobile => mobile.isMobile
);

export const selectDropdownStatus = createSelector(
  [selectUi],
  (user) => user.userDropdownStatus
);

export const selectCartHidden = createSelector(
  [selectUi],
  cart => cart.hiddenCart
);
