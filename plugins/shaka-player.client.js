import shaka from 'shaka-player/dist/shaka-player.ui';

export default defineNuxtPlugin(() => {
  return {
    provide: {
      shaka,
    },
  };
});
