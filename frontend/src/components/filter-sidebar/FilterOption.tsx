export default function FilterOption({
  children,
  placeholder,
}: {
  children: React.ReactNode
  placeholder: string
}) {
  return (
    <section className="grid gap-1">
      <h3 className="text-base font-medium">{placeholder}</h3>
      {children}
    </section>
  )
}
