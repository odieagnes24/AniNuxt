<template>
    <div class="aspect-[16/9] bg-transparent mx-auto relative">
      <div ref="videoContainer" class="absolute inset-0 w-full h-full">
        <video
          ref="video"
          class="w-full h-full object-cover rounded-md"
        ></video>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useNuxtApp } from '#app';
  import 'shaka-player/dist/controls.css';

  const { streamUrl } = defineProps(['streamUrl'])

  const videoContainer = ref(null);
  const video = ref(null);
  
  async function splitUrl(url) {
    const parts = url.split('/');
    const base = parts.slice(0, parts.length - 1).join('/');
    const segment = parts[parts.length - 1];
    return { baseUrl: base, lastSegment: segment };
  }
  
  onMounted(async () => {
    const { baseUrl, lastSegment } = await splitUrl(streamUrl);

    const { $shaka } = useNuxtApp();
    
    if ($shaka.Player.isBrowserSupported()) {
      try {
        // Create a Shaka Player instance
        const player = new $shaka.Player(video.value);
  
        // Create UI
        const ui = new $shaka.ui.Overlay(player, videoContainer.value, video.value);
  
        // Configure UI
        const config = {
          // addBigPlayButton: true,
          addSeekBar: true,
          controlPanelElements: [
            // 'rewind',
            'play_pause',
            // 'fast_forward',
            'time_and_duration',
            'spacer',
            'mute',
            'volume',
            'fullscreen',
            'overflow_menu',    
        ],
          overflowMenuButtons: ['quality', 'language', 'picture_in_picture', 'cast'],
          enableTooltips: true,
          volumeBarColors: {
            base: 'rgba(255, 255, 255, 0.54)',
            level: 'rgb(255, 0, 0)',
          },
          showUnbufferedStart: true,
          overflowMenuButtons: [
            'captions',
            'quality',
            'language',
            'picture_in_picture',
            'cast',
            'playback_rate',
          ],
        };
        ui.configure(config);

        // const controls = ui.getControls();
  
        // Register a request filter to modify the URI for each request
        player.getNetworkingEngine().registerRequestFilter((type, request) => {
          const params = new URLSearchParams(request.uris[0].split('?')[1]);
          if (!params.has('baseUrl')) {
            request.uris[0] = `${request.uris[0]}?baseUrl=${encodeURIComponent(baseUrl)}`;
          }
        });
  
        // Use the proxy URL for the initial .m3u8 request
        const proxyUrl = `/api/proxy-hls/${lastSegment}?baseUrl=${encodeURIComponent(baseUrl)}`;
  
        await player.load(proxyUrl);

        video.value.play().catch((error) => {
            console.error('Autoplay failed:', error);
        });

        console.log('The video has been loaded successfully!');
      } catch (e) {
        console.error('Error initializing the player', e);
      }
    } else {
      console.error('Browser not supported!');
    }
  });
  </script>