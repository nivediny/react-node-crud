import { Card, CardContent } from "@mui/material";
import { Grid } from "@mui/system";
import abt1 from "../assets/34.jpg";

const About = () => {
  return (
    <Grid container spacing={2}>
      <Grid item size={6} >
        <Card >
        <CardContent>
          <h2>Build & Operate Model</h2>
          <p>businessgateways (India) is the technology arm of Business Gateways International LLC (Oman) and was established in 2014 in the city of Chennai, Tamil Nadu, India. Over the past 10 years, businessgateways (India) has grown rapidly as a ready, able, and willing organization delivering bespoke cutting-edge technology-driven IT solutions to its international stakeholders.
          Our core strength lies in our ability to Build & Operate complex IT Platforms that positively impact large Business & Social Communities. And we do it well!</p>
          </CardContent>
        </Card>
      </Grid>
      <Grid item size={6} height={360}>
        <Card>
        <CardContent>
        <img  src={abt1}  loading="lazy" />
          </CardContent>
        </Card>
      </Grid>
      <Grid item size={6} >
        <Card>
        <CardContent>
          <h2>Local Content Development</h2>
          <p>Local Content prioritizing local resources, manpower and companies in the workforce and Supply Chains. It is most often a focus area in sectors that require technical sophistication to manage natural resources—namely extractive industries such as Mining, Oil, & Gas. The drive to increase Local Content, in procurement, presents a unique set of challenges and opportunities for companies bidding for business contracts or those with Supply Chain operations.Enabling Local Content-enforced IT Platforms that drive Procurement </p>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default About;
