
import classes from './main.module.css'
import Topnav from '../topnav/Topnav'
import Banner from '../banner/Banner'
import Filter from '../filterbuttons/Filterbuttons'
import Nftcard from '../nftcard/Nftcard'
import Nftgrid from '../nftgrid/Nftgrid'
import Comingsoon from '../comingsoon/Comingsoon'
import styles from '../../styles/containerstyle.module.css';
import poomin from "../../contracts/NFT.json"
import { useEffect, useState } from 'react'
import Head from 'next/head'
import { BigNumber, ethers } from "ethers";
import mktplace from "../../contracts/marketplace.json"
import axios from 'axios'
import Nftdetails from '../nftdetails/Nftdetails'
import Collection from '../collectionpage/Collection'




const Main = (props) => {
  // const [walletaddress,setWalletAddress]=useState("Connect Wallet");
  const [nfts,setnfts] =useState([]);
  // const [show,setShow] =useState(false);
  const [sortval, setsortval]=useState("htol");
  const [nftdetaildata, setnftdetaildata]=useState({});
 //console.log(props)


 useEffect(()=>{
  if(props.address!=="" && props.ssigner!=""){
    getAllToken();
   
  }  
},[props.address,props.mktcount,props.ssigner])


useEffect(()=>{ 
  sortfunc(nfts)
},[sortval])

const getAllToken= async ()=>{
  if(props.address!=="" && props.ssigner!=""){
  //const tokenContract = new ethers.Contract('0x29c45865f67A265f516D5F7bdd6ad75e185A4079',poomin, props.cprovider)
  const marketContract = new ethers.Contract(process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS, mktplace, props.ssigner)
  //console.log(marketContract)
  const data = await marketContract.getAvailableNft()
  

  const items = await Promise.all(data.map(async i =>{
  const tokenContract = new ethers.Contract(i.nftContract,poomin, props.ssigner)
  const tokenUri = await tokenContract.tokenURI(i.tokenId)
  //console.log("Ks",tokenUri)
  const meta = await axios.get(tokenUri)
  let price = ethers.utils.formatUnits(i.price.toString(),'ether')
  let item = {
    price,
    itemId:i.itemId,
    tokenId:i.tokenId.toNumber(),
    seller:i.seller,
    owner:i.holder,
    nftContract:i.nftContract,
    image:meta.data.image,
    name:meta.data.name,
    description:meta.data.description

  }
 
  return item
}))

//sortfunc(items)

setnfts(await items.sort(function (a, b) {
  return a.price - b.price;
})) 
}
}

const sortfunc= async (items)=>{
  
  if(sortval==="htol"){
    await items.sort(function (a, b) {
      return a.price - b.price;
    })
  } else if(sortval==="ltoh"){
   await items.sort(function (a, b) {
      return b.price - a.price;
    })
  }
  setnfts(items)
}


async function buyNFT(nft) {
 
    const marketContract = new ethers.Contract(process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS,mktplace,props.ssigner)
    //console.log(marketContract)
    const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
    //console.log(price.toString())
   const transaction = await marketContract.PooMarketSale(nft.nftContract,nft.itemId,{value:price})
   await transaction.wait()
   if(transaction.hash){
    setTimeout(() => {
      props.setmktcount(0)
      getAllToken();
    }, 2000);
   }

 }

//  -------nft details -----

 const [activeClaim , setActiveClaim] = useState(false)

 const toggleClaim = () => {
     setActiveClaim(!activeClaim)
 }



 const [collectionActive, setCollection] = useState(false)

 const changeCollection = () => {
   setCollection(!collectionActive)
 }
 
 const setFalse =() => {
  setCollection(true)
 }


  return (
    <div className={classes.main} style={{display: `${props.display}`}}>
   
    <div className={`${styles.container}`}>
    <Topnav collect ={setFalse} address={props.address} connect={props.connect}  walletdiscon={props.walletdiscon}  walletswitch={props.walletswitch} getSearchText={props.getSearchText}/>
    <Collection collectionActive = {collectionActive} collect ={setFalse} address={props.address} connect={props.connect}  walletdiscon={props.walletdiscon}  walletswitch={props.walletswitch} web3provider={props.web3provider} ssigner={props.ssigner} getSearchText={props.getSearchText} searchtext={props.searchtext}/>
    <div style={{display: collectionActive ? 'none' : ''}}>
       <Banner />
       <h2 className={styles.container} >Explore New Listings</h2>
       <Filter  setsortval={setsortval} setCollect = {changeCollection} collect = {collectionActive} />
    {/* // <Nftgrid /> */}


  <Nftdetails isActive={activeClaim} nftdata={nftdetaildata} closeFunc={toggleClaim} nftbuy={buyNFT} poochain={props.poochain} rewardsfunc={props.rewardsfunc} />
 
<div className={classes.container}>

{/* {nfts.length>0?nfts.map((nft,index)=> 

   <div key={index} className='basis-1/5'>

   <div className={classes.nft}>
   <div className={classes.main}>
     <img className={classes.tokenImage}  src={nft.image} alt="NFT" />
     <h2 className='text-white  font-bold'>{nft.name}</h2>
     <p className={classes.description} >{nft.description}</p>
     <div className={classes.tokenInfo} >
       <div className={classes.price}>
         
         <p>Price: {nft.price} ETH</p>
       </div>
      
     </div>
     <hr />

   </div>
  
   <div className='py-3 pl-5'>
   <buttton onClick={()=>buyNFT(nft)}className=" w-3/4 border-2 border-solid border-red-500 text-white rounded-2xl px-5 ">Buy NFT</buttton>
   </div>
   
 </div>
  
   </div>):<div>No Nfts </div> } */}
 {/* <Nftgrid length={nfts.length} nft={nft} key={index} image={nft.image} name={nft.name} price={nft.price} /> */}


<div className={styles.nftgrid__container}>

 {nfts.length>0?nfts.map((nft,index)=>
   <Nftgrid closeFunc={()=>{toggleClaim();setnftdetaildata(nft)}}  nfts={nfts} nft={nft} key={index} image={nft.image} name={nft.name} price={nft.price} />
    ):<div>No NFTs</div> } 
</div>

 
 </div>

    </div>

    </div>
        </div>
  )
}

export default Main