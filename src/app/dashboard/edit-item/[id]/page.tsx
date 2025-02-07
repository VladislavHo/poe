

import { use } from "react";
import UpdateItem from '@/app/components/Dashboard/UpdateItem/UpdateItem';
export default function Edit({ params }: any) {
  const { id } = use(params);

  return (
    < UpdateItem id={id} />
  )
}
