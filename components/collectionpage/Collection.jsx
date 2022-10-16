import { useEffect,useState } from 'react';
import classes from '../mynfts/mynfts.module.css';
import styles1 from '../collectionpage/collection.module.css' 
import {ethers } from "ethers";
import mktplace  from "../../contracts/marketplace.json";
import Topnav from '../topnav/Topnav';
import styles from '../../styles/containerstyle.module.css';
import Nftbridge from '../nftbridge/Nftbridge';
import  axios, { Axios } from 'axios';
import { replaceipfs } from '../../helper/gencalculation';
import InfiniteScroll from "react-infinite-scroll-component";



//import waladdress from "../_app"

export default function Collection(props) {
    const [nfts,setnfts] =useState([]);
    const [show,setShow] =useState(false);
    const [pri,setPrice] = useState("0")
    const [arrlength,setarrlength]=useState(20)
    const [startnum, setstartnum]=useState(1)
    const [totsupplynft, settotsupplynft]=useState(0)
    const [cnft, setcnft]=useState("")
    const [endnum, setendnum]=useState(20)
    const [hasmore,sethasmore]=useState(true)
    let nftarray=[];
    const caddress=props.searchtext
   //console.log("oo",props)

    


    useEffect(()=>{
      nftarray=[];
      setstartnum(1)
      setnfts([])
      if(props.address!=="" && props.ssigner!==""){
         getAllContractNft();
      }
        
    },[props.searchtext])

  


 
    

    const getAllContractNft=async() =>{
      if(props.address!=="" && props.ssigner!==""){
      if(caddress.charAt(0)==='0'){
        const data= await fetch("api/tokencontractabi", {
        method:'POST',
        body:JSON.stringify({contractaddress:caddress}),
        headers:{
           'Content-Type': 'application/json'
         }
        })
        const ab=await data.json();
        //console.log("kk",props)
       if(props.ssigner!==""){
        const contractnft= new ethers.Contract(caddress,ab.abiData,props.ssigner);
        setcnft(contractnft)
        const totsupply=await contractnft.totalSupply();
        settotsupplynft(totsupply)
       // console.log(Number(totsupply))
        

       
       
        }
        // setendnum(endnum+arrlength)
        // setstartnum(endnum-arrlength)
       
        // setShow(true)
        // setnfts(nftarray)
      }
    }

    }


    const fetchData= async (totsupply,contractnft)=>{
      let i=startnum;
      if(totsupply>i) {
        
        console.log("ss",i)
       // for (let i=1;i<endnum;i++){
          let tokenuri=""
          try{
            tokenuri=await contractnft.tokenURI(i);
            tokenuri= replaceipfs(tokenuri);
             await axios.get(tokenuri).
            // then(resp=>{ const nftnew={name:resp.data.name, image:replaceipfs(resp.data.image)};nftarray.push(nftnew);})
            then(resp=>{ 
             if(resp.data.image!==undefined){
               const nftnew={name:resp.data.name, image:replaceipfs(resp.data.image)};nftarray.push(nftnew) ;}
             })
            // console.log(tokenuri) 
          } catch(e) {
            console.log("ll",e)
          } finally{
            console.log("go Ahead uri")
          }
          
          
        
          //   try {
          //   await axios.get(tokenuri).
          //  // then(resp=>{ const nftnew={name:resp.data.name, image:replaceipfs(resp.data.image)};nftarray.push(nftnew);})
          //  then(resp=>{ 
          //   if(resp.data.image!==undefined){
          //     const nftnew={name:resp.data.name, image:replaceipfs(resp.data.image)};nftarray.push(nftnew) ;}
          //   })
           
          //   } catch(e) {
          //    console.log("ll",e)
          //  } finally {
          //    console.log("go Ahead")
          //  }
           if(i===totsupply){
            sethasmore(false)
          } 
       // }
         setstartnum(startnum+1)
         setnfts(nfts.concat(nftarray))
         setarrlength(nfts.length)
         console.log(nfts)
         
      
       

      }
    }







  return (
    <div style={{display: props.collectionActive ? '' : 'none'}}  className={`${classes.main} ${styles.container}`}>
     
    {/* <Topnav address={props.address} connect={props.connect}  walletdiscon={props.walletdiscon}  walletswitch={props.walletswitch}
     getSearchText={props.getSearchText} sethasmore={sethasmore} collect ={props.collect}/> */}
      <h1 className={styles.container}>Collection</h1>
      <div id="scrollableDiv" style={{ height: '100vh', overflow: "auto" }} className={styles1.scroll}>
      <InfiniteScroll
            dataLength={arrlength}
            next={fetchData(totsupplynft,cnft)}
            hasMore={nfts.length<totsupplynft}
            loader={<h4>Loading...</h4>}
            scrollableTarget="scrollableDiv"
          >
          <div className={`${classes.nftgrid__container} ${styles.container} ${styles1.scrollContent}`}>
          {nfts.map((nft,index)=> 
          <div key={index} className='basis-1/5'>
          <div className={classes.nft__card}>
          <div className={classes.card__image}>
          <img src={nft.image} alt="nFT" />
          </div>
          <div className={classes.name}>
          <h4>{nft.name}</h4>
          </div>
          </div>
          </div>) }
          </div>
          </InfiniteScroll>
 
    </div>

   </div>

  )
}

