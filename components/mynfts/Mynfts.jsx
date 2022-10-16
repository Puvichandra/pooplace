import { useEffect,useState } from 'react';
import classes from '../mynfts/mynfts.module.css';
import {ethers } from "ethers";
import mktplace  from "../../contracts/marketplace.json";
import Topnav from '../topnav/Topnav';
import styles from '../../styles/containerstyle.module.css';
import Nftbridge from '../nftbridge/Nftbridge';
import Connect from '../connectwallet/Connectwallet'


//import waladdress from "../_app"

export default function MyNftPage(props) {
    const [nfts,setnfts] =useState([]);
    const [show,setShow] =useState(false);
    const [abi,setAbi] =useState([]);
    const [tokenContract,settTokenContract] = useState()
    const [pri,setPrice] = useState("0")

    


    useEffect(()=>{
      if(props.address!="" && props.ssigner!==""){
        getAllNft();
      }
        
    },[props.address,props.mktcount,props.ssigner])

  


    const getAllNft=()=>{
      //console.log(props.caddres)
      setnfts([])
    
        if(props.address.charAt(0)==='0'){
   
            fetch("api/getallnft", {
            method:'POST',
            body:JSON.stringify({address:props.address}),
             headers:{
               'Content-Type': 'application/json'
             }
           }).then((res)=>res.json()).catch((e)=>{console.log(e)})
          .then((data)=>{
           // console.log("ddx", data.allNft)
          
             if(data.allNft!=undefined){
              setnfts(data.allNft); setShow(true); //console.log("dd",data.allNft);
             }
                  
          })
          .catch((e)=>{
            console.log("error in fetching")
            });
          }
    }



    async function relistNFT(id,caddress) {
      //console.log(caddress)
     
      if(caddress.charAt(0)==='0'){
      const data= await fetch("api/tokencontractabi", {
      method:'POST',
      body:JSON.stringify({contractaddress:caddress}),
      headers:{
         'Content-Type': 'application/json'
       }
      })
      const ab=await data.json();
      //console.log(ab)
     const contractnft= new ethers.Contract(caddress,ab.abiData,props.ssigner);
     await contractnft.setApprovalForAll(process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS, true);
      let price = ethers.utils.parseUnits(pri, 'ether') ;
     
     
      const contract = new ethers.Contract(process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS, mktplace , props.ssigner)
      //console.log("mm",contract)
      let listingFee = Number(await contract.getListingFee());
      //console.log(listingFee)
      listingFee=listingFee.toString();
     
      if(listingFee!==undefined){
        let transaction = await contract.createVaultItem(caddress,id, price, { value: listingFee })
       await transaction.wait()
       if(transaction.hash){
        setTimeout(() => {
          getAllNft()
          props.setmktcount(1)
        }, 2000);
           }
      
      
      }
         
      }
     
  }




  return (
    <div style={{display: `${props.display}`}}  className={`${classes.main} ${styles.container}`}>
     <div className={`${classes.mynfts__top} ${styles.container}`}>

<Connect address={props.address} connect={props.connect} walletdiscon={props.walletdiscon} walletswitch={props.walletswitch} />
</div>
    {/* <Topnav address={props.address} connect={props.connect}  walletdiscon={props.walletdiscon}  walletswitch={props.walletswitch} getSearchText={props.getSearchText}/> */}
      <h1 className={styles.container}>My NFTs</h1>
 
    <div className={`${classes.nftgrid__container} ${styles.container}`}>

{show===true?nfts.map((nft,index)=> 

  <div key={index} className='basis-1/5'>

  {/* <div className={classes.nft}>
  <div className={classes.main}>
    <img className={classes.tokenImage}  src={nft.image} alt="NFT" />
    <h2 className='text-white  font-bold'>{nft.name}</h2> */}
    {/* <p className={classes.description} >{nft.description}</p> */}
    {/* <div className={classes.tokenInfo} >
     
   
    </div>
    <hr />

  </div>

  <div className='py-3 pl-5'>
  <input type="Number" onChange={(e)=>setPrice(e.target.value)} className=" w-3/4 border-2 border-solid border-red-500 text-black rounded-2xl px-5 "/>
  </div>
 
  <div className='py-3 pl-5'>
  <buttton onClick={()=>relistNFT(nft.tokenid,nft.contractaddress)}className=" w-3/4 border-2 border-solid border-red-500 text-white rounded-2xl px-5 ">List for Resale</buttton>
  </div>
  
</div> */}
    <div className={classes.nft__card}>
    <div className={classes.card__image}>
      <img src={nft.image} alt="nFT" />
    </div>
    <div className={classes.name}>
    <h4>{nft.name}</h4>

    {/* <small className={classes.text__muted}>Poochain Genesis</small> */}
    </div>
    <div className={classes.nft__sell}>
    <input type="Number" placeholder='Price' onChange={(e)=>setPrice(e.target.value)} className={classes.price__input}/>
    <buttton onClick={()=>relistNFT(nft.tokenid,nft.contractaddress)}className={classes.sell__btn}>Sell</buttton>

      {/* <img src='img/bsc.png' alt="bnb" />
      <h4>{props.price} BNB</h4> */}
    </div>
  </div>
 
  </div>) :<div> No NFTS</div>}
</div>

  {/* <button onClick={ async ()=>{  setnftContract( nft.contractaddress);setnftid(nft.id);relistNFT(nft.id,nft.contractaddress)}}className=" w-3/4 border-2 border-solid border-red-500 text-white rounded-2xl px-5 ">List for Resale</button> */}
  {/* <buttton onClick={()=>getAbi(nft.contractaddress)}className=" w-3/4 border-2 border-solid border-red-500 text-white rounded-2xl px-5 ">List for Resale</buttton> */}



       </div>



//     <>
//   <div className='' >
//  <Topnav  address={props.address} connect={props.connect}  walletdiscon={props.walletdiscon}  walletswitch={props.walletswitch}/>
//  </div>
// <div>
// <div className='flex flex-rows flex-wrap gap-2 justify-center'>

// {show===true?nfts.map((nft,index)=> 

//    <div key={index} className='basis-1/4'>

//    <div className={classes.nft}>
//    <div className={classes.main}>
//      <img className={classes.tokenImage}  src={nft.image} alt="NFT" />
//      <h2 className='text-white  font-bold'>{nft.name}</h2>
//      {/* <p className={classes.description} >{nft.description}</p> */}
//      <div className={classes.tokenInfo} >
      
    
//      </div>
//      <hr />

//    </div>

//    <div className='py-3 pl-5'>
//    <input type="Number" onChange={(e)=>setPrice(e.target.value)} className=" w-3/4 border-2 border-solid border-red-500 text-black rounded-2xl px-5 "/>
//    </div>
  
//    <div className='py-3 pl-5'>
//    <buttton onClick={()=>relistNFT(nft.tokenid,nft.contractaddress)}className=" w-3/4 border-2 border-solid border-red-500 text-white rounded-2xl px-5 ">List for Resale</buttton>
//    </div>
   
//  </div>
  
//    </div>) :<div> No NFTS</div>}
 

 
//  </div>
//  </div>
// </>

   
  )
}

