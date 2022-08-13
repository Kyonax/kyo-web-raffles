import React, { useState, useEffect } from 'react'; import './App.css';
import { getTokenMetadataSolscan, getDataStaking } from './tools/api_blockchain_functions'
import Home from './pages/Home'
/*Locale and Libraries*/
import { HashRouter, BrowserRouter, Route, Routes } from "react-router-dom";

import * as Exe from './tools/functions';
function App() {

  let [tps, setTps] = useState(null), [tokenData, setTokenData] = useState({ data: { symbol: "Coin", supply: 0 } });
  let [stakingData, setStakingData] = useState({ total: 0, alpha_amount: 0, bust_amount: 0 })
  const [loading, setLoading] = useState(false);

  const APIsData = async () => {
    try {
      let _tps = await Exe.axiosGet("https://api.solanart.io/get_solana_tps");
      let _token = await getTokenMetadataSolscan(process.env.REACT_APP_TOKEN);
      let _supply_token = _token.data.supply;
      _token.data.supply = await Exe.numberWith(parseInt(String(_supply_token).slice(0, 7)), ","); setTokenData(_token);

      _tps = await Exe.numberWith(_tps?.data?.tps, ","); setTps(_tps);
    } catch (error) { console.log(error) }
  }

  useEffect(() => {
    APIsData()
  }, [])

  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Home solana_tps={tps} rot_data={tokenData} />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
