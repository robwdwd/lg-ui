export default defineAppConfig({
  title: 'Network Looking Glass',
  ui: {
    colors: {
      primary: 'cyan',
      neutral: 'zinc',
    },
    button: {
      defaultVariants: {
        // Set default button color to neutral
        // color: 'neutral'
      }
    },
    modal: {
      variants: {
        fullscreen: {
          true: {
            content: 'inset-0'
          },
          false: {
            content: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-2rem)] max-w-7xl max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-4rem)] rounded-lg shadow-lg ring ring-default'
          }
        }
      }
    }
  }
})
