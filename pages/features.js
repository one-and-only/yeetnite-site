import Footer from "./footer";
import Header from "./header";
// styles
import styles from '../styles/features.module.scss'

/**
 * Component for the Features Page
 */
export default function Features() {
   return (
      <div className={styles.body}>
         <Header />
         <div className={styles.mainText}>
            <h2 id="supported-clients">Supported Clients</h2>
            <ul>
               <li>Season 0 &amp; 1: <strong>1.X</strong></li>
               <li>Season 6: <strong>6.21</strong>, <strong>6.30</strong> Officially tested (all should work)</li>
               <li>Season 7: <strong>None</strong> officially tested (all should work)</li>
            </ul>
            <h2 id="supported-features">Supported Features</h2>
            <ul>
               <li>Login + Fortnite Lobby</li>
               <li>Emotes</li>
               <li>Locker Customization</li>
               <li>XMPP (Friend Requests + Block/Unblock Users, Partying, Whisper, Live Presence Updates)</li>
               <li>Persistent Per-Player Saves</li>
            </ul>
            <h2 id="unsupported-features">Unsupported Features</h2>
            <ul>
               <li>Party Chat (Originally Planned to Work, Unable to Resolve Issues With It)</li>
               <li>Matchmaking + Matches (Planned for Future)</li>
            </ul>
         </div>
         <Footer />
      </div>
   );
}