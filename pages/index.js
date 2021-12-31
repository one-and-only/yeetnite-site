import dynamic from 'next/dynamic';
import Image from 'next/image'
import Link from 'next/link';
import styles from '../styles/home.module.scss';
import yeetniteImg from '../public/images/yeetnite.webp'
import Footer from './footer';

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
    <div>
      <Header />
      <div>
        <p className={styles.titleText}>Welcome To</p>
        <Image src={yeetniteImg} alt='Yeetnite Logo' layout='intrinsic' className={styles.center} />
        <p className={styles.homeDescription}>Yeetnite is a Fortnite Private Server that implements all the capabilities of Fortnite and even allows for matchmaking, friending, partying up, etc.<br /><br />Please visit the <Link href="/features">Features</Link> page for more information on what we support</p>
      </div>
      <Footer />
    </div>
  );
}
