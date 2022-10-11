import React from 'react'
import classes from '../Nftdetails/nftdetails.module.css';
import {AiFillCloseCircle} from 'react-icons/ai'
import styles from '../../styles/containerstyle.module.css';
import {BsGlobe} from 'react-icons/bs'


const Nftdetails = (props) => {
    //console.log(props)
  return (
    <div className={classes.claimrewards}  style={{display : props.isActive ? "flex" : "none"}}>
    <div className={classes.content__wrapper}>
    <div className={`${classes.left} ${styles.container}`}>
        <div className={classes.nft__img}>
            <img src={props.nftdata.image} alt="nft" />
        </div>

        {/* <div className={classes.details}> */}
            
                {/* <h2>Description</h2> */}
                {/* <p>HorrorApeClub is a collection of 3333 unique and community owned NFT's built on the Binance smart chain!!!...</p> */}
            
            
        
        {/* </div> */}
    </div>

    <div className={`${classes.right} ${styles.container}`}>
        <div>

            <h1>{props.nftdata.name}</h1>
            <small>Owned by {props.nftdata.seller}</small>
        </div>
            <div className={classes.details1}>

            <h2>Description</h2>
                <p>{props.nftdata.description}</p>
            </div>
            <div>
            <p>Sell price</p>

            <b>{props.nftdata.price} BNB</b>
            </div>
            <button onClick={()=>{props.nftbuy(props.nftdata)}}>Buy Now</button>
            {/* <div className={classes.nft__links}>
                <a href="#">Contract</a>
                <a href="#"><BsGlobe /></a> 
             </div>  */}
    </div>
    {/* {props.poochain>0?<button  onClick={props.rewardsfunc}>CLAIM</button>: <button disabled>CLAIM</button>} */}
<AiFillCloseCircle className={classes.claim__close} onClick={props.closeFunc} />
</div>
</div> 
  )
}

export default Nftdetails