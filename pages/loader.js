import Image from 'next/image';
import loading from '../public/images/loader.svg';

export default function Loading() {
  return (
    <div className="center">
        <Image src={loading} alt="Loading..." />
    </div>
  );
}
