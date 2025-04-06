export const productosKeys = {
  all: () => ["productos"] as const,
  list: () => [...productosKeys.all(), "list"] as const,
  detail: (id: string) => [...productosKeys.all(), "detail", id] as const,
  profilter: () => [...productosKeys.all(), "pro"] as const,
  proFilterById: (params: number) =>
    [...productosKeys.profilter(), params] as const,
};
