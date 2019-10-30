export const SET_SCREEN_SIZE = 'SET_SCREEN_SIZE';

export const updateScreenSize = (isMobile) => ({
    type: SET_SCREEN_SIZE,
    payload: isMobile
});
