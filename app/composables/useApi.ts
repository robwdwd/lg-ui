import { TOAST_MESSAGES } from '~~/constants';

export function useApi() {
  const toast = useToast();
  const showProgress = ref(false);

  async function fetchResults<T>(url: string, body: ApiPostBody | MultiApiPostBody): Promise<T | null> {
    showProgress.value = true;
    toast.add(TOAST_MESSAGES.info);

    try {
      return await $fetch<T>(url, {
        method: 'POST',
        body,
        timeout: body.timeout,
      });
    } catch (error) {
      toast.add(TOAST_MESSAGES.error);
      console.error('API call error:', error);
      return null;
    } finally {
      showProgress.value = false;
    }
  }

  return { showProgress, fetchResults };
}