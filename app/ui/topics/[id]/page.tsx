// This page will show questions for a specific topic.
// The `params.id` will give you the topic ID from the URL.
export default function Page({ params }: { params: { id: string } }) {
  return <div>Questions for Topic ID: {params.id}</div>;
}