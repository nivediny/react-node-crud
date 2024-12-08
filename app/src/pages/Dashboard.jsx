// import  { useState, useEffect } from 'react';
import { 
  Grid2  as Grid, 
  Box,
  Card, 

} from '@mui/material';

import DashboradCard from '../components/DashboradCard';
import ProgressBar from '../components/ProgressBar';



const Dashboard = () => {
  // const [loading, setLoading] = useState(true);

  const boxData = [
    { title: "Revenue", value: "$10,000", change: "+5%", positive: true ,color:"red"},
    { title: "Users", value: "1,200", change: "-2%", positive: false ,color:"red"},
    { title: "Operator", value: "320", change: "+8%", positive: true ,color:"red"},
    { title: "Closure", value: "95%", change: "+3%", positive: true ,color:"orange"},
  ];

  // useEffect(() => {
  //   const timer = setTimeout(() => setLoading(false), 2000);
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <Grid sx={{ width: '100%' }}>
      <Grid item xs={12}>
        <Box sx={{ width: '100%' }}>
          <Grid 
            container 
            spacing={2}            
          >
            {boxData.map((item, index) => (
              <Grid 
                item 
                key={index}
                sx={{ 
                  minWidth: { xs: '100%', sm: '45%', md: '270px' },
                  maxWidth: { xs: '100%', sm: '50%', md: '25%' },
                  flexGrow: 1,
                  flexShrink: 0
                }}
              >
                <DashboradCard 
                  title={item.title}
                  value={item.value}
                  change={item.change}
                  positive={item.positive}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={12} spacing={2}  sx={{ mt: 8}}>
      <Card sx={{ width: '100%' }}>
       <ProgressBar/>
       </Card>
        </Grid>
    </Grid>
  );

};

export default Dashboard;