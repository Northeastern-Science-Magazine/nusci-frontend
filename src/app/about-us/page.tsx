import Box from "@/design-system/primitives/Box";
import { Grid, GridCol, GridRow } from "@/design-system/primitives/Grid";

export default function AboutUsPage() {
  return (
    <Box className="">
      <Grid col span={2}>
        <GridCol>
          <Grid row span={3}>
            <GridRow>Eboard</GridRow>
            <GridRow>Web & Software</GridRow>
            <GridRow>Design</GridRow>
          </Grid>
        </GridCol>
        <GridCol>
          <Grid row span={3}>
            <GridRow>Writing</GridRow>
            <GridRow>Photography</GridRow>
            <GridRow>Social Media</GridRow>
          </Grid>
        </GridCol>
      </Grid>
    </Box>
  );
}
