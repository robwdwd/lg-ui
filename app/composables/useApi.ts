import { ref } from 'vue';
import { TOAST_MESSAGES } from '~~/constants';

export function useApi() {
  const toast = useToast();
  const api_call_progress = ref(null);
  const api_call_show_progress = ref(false);

  async function fetchResults<T>(url: string, body: ApiPostBody | MultiApiPostBody): Promise<T | null> {
    api_call_show_progress.value = true;
    toast.add(TOAST_MESSAGES.info);

    try {
      const response = await $fetch<T>(url, {
        method: 'POST',
        body,
        timeout: body.timeout,
      });
      return response;
    } catch (error) {
      toast.add(TOAST_MESSAGES.error);
      console.error('API call error:', error);
      return null;
    } finally {
      api_call_show_progress.value = false;
    }
  }

  return { api_call_progress, api_call_show_progress, fetchResults };
}