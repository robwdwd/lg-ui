<template>
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Spyglass lens -->
        <circle cx="16" cy="16" r="8" fill="var( --ui-bg )" stroke="var( --ui-primary )" stroke-width="2.5" />
        <circle cx="16" cy="16" r="4" fill="var( --ui-primary )" fill-opacity="0.15" />
        <!-- Spyglass handle -->
        <rect x="22" y="22" width="10" height="3" rx="1.5" transform="rotate(45 22 22)" fill="var( --ui-primary )" />
        <!-- Network nodes -->
        <circle cx="7" cy="7" r="2" fill="var( --ui-primary )" />
        <circle cx="32" cy="10" r="2" fill="var( --ui-primary )" />
        <circle cx="10" cy="32" r="2" fill="var( --ui-primary )" />
        <!-- Network edges -->
        <line x1="16" y1="16" x2="7" y2="7" stroke="var( --ui-primary )" stroke-width="2" />
        <line x1="16" y1="16" x2="32" y2="10" stroke="var( --ui-primary )" stroke-width="2" />
        <line x1="16" y1="16" x2="10" y2="32" stroke="var( --ui-primary )" stroke-width="2" />
    </svg>
</template>
