import { Box } from "@mui/material";
import Skeleton from "../components/Skeleton";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import img1 from "../assets/img1.jpg";

 const CardSkeleton = () => {
    function CardSkeleton() {
        const [loading, setLoading] = useState(true);
        useEffect(() => {
          const timer = setTimeout(() => {
            setLoading(false);
          }, 2000);
      
          return () => clearTimeout(timer);
        }, []);
        return (
          <Box
            sx={{
              p: 4,
              borderRadius: 2,
              boxShadow: 2,
              backgroundColor: "#fff",
            }}
          >
            {loading ? (
              <Skeleton variant="rectangular" height={56} />
            ) : (
              <Card sx={{ maxWidth: 345 }} height={50}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={img1}
                    alt="green iguana"
                  />
                  <CardContent>
                    {/* <Typography gutterBottom variant="h5" component="div">
                      Lizard
                    </Typography> */}
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    The ‘Single Window’ Supplier Registration and Certification System implemented on behalf of the Ministry    of Energy and Minerals, Oman.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            )}
          </Box>
        );
      }
  return (
    <div><CardSkeleton/></div>
  )
}

export default CardSkeleton;
