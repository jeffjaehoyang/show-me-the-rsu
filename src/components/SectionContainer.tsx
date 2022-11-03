import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function SectionContainer({ children }: Props) {
  return <div className="max-w-lg mx-auto px-7 md:px-0">{children}</div>;
}
