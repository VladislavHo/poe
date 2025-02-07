import UpdateItem from '@/app/components/Dashboard/UpdateItem/UpdateItem';
import { use } from 'react';




// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export default function Edit({ params }: any) {
  const { id } = use(params) as { id: string };

  return (
    <UpdateItem id={id} />
  );
}