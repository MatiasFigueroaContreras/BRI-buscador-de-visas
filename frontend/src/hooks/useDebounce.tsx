export default function useDebounce(
  callback: (value: any) => void,
  delay: number
) {
  let timeout: NodeJS.Timeout
  let oldValue: any

  const debounceHandler = (value: any) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      if (oldValue === value) return
      oldValue = value
      callback(value)
    }, delay)
  }

  return debounceHandler
}
