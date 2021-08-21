import dynamic from 'next/dynamic';
import styles from '../styles/home.module.scss';

const LoadCircle = dynamic(
  () => import('./loader'), { ssr: false }
);

const Header = dynamic(
  () => import('./header'), {
    loading: LoadCircle,
    ssr: false,
  },
);

/**
 * Component for the Home page
 */
export default function Home() {
  return (
    <Header />
  );
}
