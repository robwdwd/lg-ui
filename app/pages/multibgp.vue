<template>
  <MultiCommandPage :command="CommandTypes.BGP" :max-destinations="$config.public.maxDestBgp" :max-locations="$config.public.maxLocsBgp"
    :result-component="bgpResult" />
</template>

<script setup lang="ts">

import { CommandTypes } from '~~/constants';

const bgpResult = resolveComponent('BgpResult')

</script>
