import { Box, Grid } from "@material-ui/core";
import { Header } from "./components/Header";
import { Input } from "./components/Input";

export const App = () => {
  return (
    <Box overflow="hidden" pb="20px">
      <Grid container direction="column" spacing={0}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12}>
          <Input />
        </Grid>
      </Grid>
    </Box>
  );
};
