
import classes  from  './topnav.module.css'
import {BiSearchAlt} from 'react-icons/bi'
import Connect from '../connectwallet/Connectwallet'
import styles from '../../styles/containerstyle.module.css';
import { useEffect, useState } from 'react';

const Topnav = (props) => {
const [data,setData] =useState([]);
const [search,setSearch] = useState("");

useEffect(()=>{
  fetch('/api/addnewcollection')
  .then(response => response.json())
  .then((data) => setData(data.poonftlist))
},[])

//console.log("dd",props)

const onClickItem=(item)=>{
 

}

let filtered = data.filter(item => item.coinname.toLowerCase().includes(search.toLowerCase()));
//console.log(filtered)
//let filteredtwo = data.filter(item => item.coinsymbol.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className={`${classes.topnav} ${styles.container}`}>
      <div className={classes.search__collection}>
      <div>
      <BiSearchAlt className={classes.search__icon} style={{display:"inline-block"}}/>
        <input type="Search" placeholder='Search NFT Collections' 
         id="search"
         value={search}
         onChange={(e)=>{setSearch(e.target.value)}}
         onFocus={(e)=> e.target.parentNode.parentNode.classList.add('focus')}
        />

     
      
      {search.length > 1 && filtered.length > 0 && (
            <ul className={classes.list}>
              {filtered.map(item => (
                <li key={item._id} onClick={() => {props.getSearchText(item.coinsymbol);setSearch(item.coinname);props.collect()}}> {item.coinname}</li>
              ))}
            </ul>
          )} 
      </div>
      
      </div>
     

      <Connect address={props.address} connect={props.connect} walletdiscon={props.walletdiscon} walletswitch={props.walletswitch} />
    </div>
  )
}

export default Topnav