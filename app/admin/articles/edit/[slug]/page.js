export default async function page({params}) {
  const {slug} = await params
  return (
    <div>{slug}</div>
  )
}
