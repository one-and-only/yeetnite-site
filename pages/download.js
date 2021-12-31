import Header from "./header";
import Footer from "./footer";
import Link from "next/link";
import styles from '../styles/download.module.scss';
import { FaCloudDownloadAlt } from 'react-icons/fa';
import { Button } from "react-bootstrap";

/**
 * Component for the Download Page
 */
export default function Setup() {
  return (
    <div>
      <Header />
      <div className={styles.mainText} align="center">
        <Link href="/FNConfigs/yeetnite.farx" download passHref><Button><FaCloudDownloadAlt /> Fiddler AutoResponder Rules</Button></Link>
      </div>
      <Footer />
    </div>
  );
}