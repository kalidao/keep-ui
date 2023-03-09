import { useRouter } from 'next/router'

export const useGetParams = () => {
  const router = useRouter()

  return { ...router.query }
}
