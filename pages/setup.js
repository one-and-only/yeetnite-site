import Header from "./header";
import Footer from "./footer";
import Link from "next/link";
import Image from "next/image";
import styles from '../styles/setup.module.scss'
import importFarx from '../public/images/import-farx.png'
import enableRules from '../public/images/enable-rules.png'

/**
 * Component for the Setup Page
 */
export default function Setup() {
  return (
    <div>
      <Header />
      <div className={styles.mainText}>
        <ol>
          <li>Make sure you have downloaded a <Link href="/features">supported Fortnite client</Link></li>
          <li>Download and install <Link href="https://www.telerik.com/download/fiddler" passHref><em>Fiddler Classic</em></Link>. This will redirect all of Fortnite&apos;s traffic to our servers for processing.</li>
          <li>Now we need to tell <em>Fiddler Classic</em> how to process traffic. For this, we will need to download and import a <em>Fiddler AutoResponder Rules</em> (FARX) file. Please visit the <Link href="/download">Downloads</Link> page.</li>
          <li>Once you have the file, use the <code>Import...</code> button as shown below:<br />
            <Image src={importFarx.src} alt="Import Fiddler AutoResponder Rules (FARX) File" width={1125} height={191} /></li>
          <li>Next, enable the rule that you just imported and tick the checkbox near the rule and the <code>Enable rules</code> checkbox. This is very important, as the rules are disabled by default. This is shown below:<br />
            <Image src={enableRules.src} alt="Enable AutoResponder Rule" width={393} height={326} /></li>
          <li>Now just launch your compatible Fortnite client with the <code>launcher.bat</code> file that should be under <code>&lt;FORTNITE_DIRECTORY&gt;\FortniteGame\Binaries\Win64\</code></li>
          <li>Enjoy! 🎉🥳</li>
        </ol>
      </div>
      <Footer />
    </div>
  );
}