import React from 'react'
import classes from './mynftcard.module.css'


const Mynftcard = () => {
  return (
    <div className={classes.nft__card}>
    <div className={classes.card__image}>
      <img src={props.image} alt="nFT" />
    </div>
    <div className={classes.name}>
    <h4>{props.name}</h4>

    <small className={classes.text__muted}>Poochain Genesis</small>
    </div>
    <div className={classes.nft__price}>
      <img src='img/bsc.png' alt="bnb" />
      <h4>{props.price} BNB</h4>
    </div>
  </div>
  )
}

export default Mynftcard