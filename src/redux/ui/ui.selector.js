import { createSelector } from 'reselect';

const selectMobile = state => state.ui;

export const selectIsMobile = createSelector(
  [selectMobile],
  mobile => mobile.isMobile
);