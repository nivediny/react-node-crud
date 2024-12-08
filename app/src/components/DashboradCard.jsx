import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { Card, CardContent, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";

const DashboradCard = ({ title, value, change, positive ,color}) => (
  <Card sx={{
    backgroundColor:{color},
  }}>
    <CardContent
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        
      }}
    >
      <div>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Divider sx={{ my: 1 }} />
      </div>
      <Typography variant="h4" fontWeight="bold" sx={{ flexGrow: 1 }}>
        {value}
      </Typography>
      <Box
        display="flex"
        alignItems="center"
        mt={1}
        color={positive ? "green" : "red"}
      >
        {positive ? (
          <ArrowUpward fontSize="small" />
        ) : (
          <ArrowDownward fontSize="small" />
        )}
        <Typography variant="body2" ml={0.5}>
          {change}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

export default DashboradCard;
