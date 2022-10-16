
import classes from './nftgrid.module.css'
import Nftcard from '../nftcard/Nftcard'
import styles from '../../styles/containerstyle.module.css';

const nftgrid = (props) => {
  return (
    <div className={classes.nftgrid__container}>
      

        <Nftcard key={props.key} buy={props.buy} closeFunc={props.closeFunc} image={props.image} name={props.name} price={props.price} />
    {/* <Nftgrid nfts={nfts} nft={nft} key={index} image={nft.image} name={nft.name} price={nft.price} /> */}

    </div>
  )
}

export default nftgrid