
import classes from './nftcard.module.css'


const nftcard = (props) => {
  return (
    <div className={classes.nft__card} onClick={props.closeFunc}>
        <div className={classes.card__image}>
          <img src={props.image} alt="nFT" />
        </div>
        <div className={classes.name}>
        <h4>{props.name}</h4>

        {/* <small className={classes.text__muted}>Poochain Genesis</small> */}
        </div>
      
        <div className={classes.nft__price}>
          <img src='img/bsc.png' alt="bnb" />
          <h4>{props.price} BNB</h4>

          <buttton onClick={()=>props.buy(props.nft)} className={classes.buy__btn}>Buy</buttton>
        </div>
          
      </div>
  )
}

export default nftcard