<template>
  <MultiCommandPage :command="CommandTypes.PING" :max-destinations="$config.public.maxDestPing" :max-locations="$config.public.maxLocsPing"
    result-component="PingResult" />
</template>

<script setup lang="ts">

import { CommandTypes } from '~~/constants';

</script>
