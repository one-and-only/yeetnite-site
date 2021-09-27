import dynamic from 'next/dynamic';
import styles from '../styles/home.module.scss';
import Image from 'next/image'
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
        <p className={styles.homeDescription}>Yeetnite is a Fortnite Private Server that implements all the capabilities of Fortnite and even allows for matchmaking, friending, partying up, etc. Currently login and some lobby functions are provided as functional, and partying up, matchmaking, etc. will come at a later date.</p>
      </div>
      <Footer />
    </div>
  );
}
