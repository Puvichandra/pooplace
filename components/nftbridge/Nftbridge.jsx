import React from 'react'
import styles from '../../styles/containerstyle.module.css';
import classes from '../nftbridge/nftbridge.module.css';
import Script from 'next/script';

const Nftbridge = (props) => {
  return (
    <div style={{display: `${props.display}`}} className={`${classes.main} ${styles.container}`} >
        <h1>Bridge NFTs</h1>
        <div style={{width:'100%',height:'600px' }}>
            
            <iframe src='https://widget.xp.network/?widget=true&background=rgba(0, 0, 0, 0)&panelBackground=131129&modalBackground=131129&color=ffffff&fontSize=16&btnColor=ffffff&btnBackground=131129&btnRadius=9&fontFamily=Roboto&chains=Ethereum-Godwoken-Polygon-VeChain-BSC-Avalanche-Harmony-Aurora-Tron-Algorand-Tezos-Elrond-Fantom-Gnosis-GateChain-Iotex-Velas-Fuse-Moonbeam-Abeychain-Internet Computer-Caduceus-Skale-Hedera-Secret-Solana-Cardano-TON&from=&to=&cardBackground=131129&cardBackgroundBot=1e222d&cardColor=ffffff&cardRadius=25&secondaryColor=ffffff&accentColor=ffffff&borderColor=988b8b&iconColor=3e64ed&tooltipBg=1D212A&tooltipColor=1D212A&wallets=MetaMask-BitKeep-WalletConnect-TrustWallet-MyAlgo-AlgoSigner-TronLink-Maiar-Beacon-TempleWallet-MaiarExtension-Sync2-VeChainThor-Sync2-VeChainThor-TronLink-MyAlgo-AlgoSigner-Beacon-TempleWallet-Maiar-MaiarExtension-Keplr&bridgeState=undefined&showLink=false&affiliationFees=1' width="100%" height="100%" id="xpnetWidget"></iframe><Script src='https://widget.xp.network/wscript.js'></Script></div>
    </div>

  )
}

export default Nftbridge