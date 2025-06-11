export function useApi() {

  async function fetchResults<T>(url: string, body: ApiPostBody | MultiApiPostBody): Promise<T | null> {

    try {
      const result = await $fetch<T>(url, {
        method: 'POST',
        body,
        timeout: body.timeout,
      });
      return result as T;
    } catch (error) {
      console.error('API call error:', error);
      throw error;
    }
  }

  return { fetchResults };
}