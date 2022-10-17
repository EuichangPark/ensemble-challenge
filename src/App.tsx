import { useState, ChangeEvent } from "react";

import {
  Box,
  CircularProgress,
  TextField,
  Typography,
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import { Favorite, Share } from "@mui/icons-material";

import { MovieInterface } from "src/types/MovieInterface";
import { api } from "src/api/movie";

function App() {
  const [allMovies, setAllMovies] = useState<MovieInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const search = async (key: string) => {
    setIsLoading(true);
    const response = await api.get("", {
      params: { apikey: process.env.REACT_APP_API_KEY, t: key },
    });

    if (response.data.Response === "False") {
      setIsLoading(false);
      return [];
    }

    setIsLoading(false);
    return [response.data];
  };

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    const res = await search(e.target.value);
    setAllMovies(res);
  };

  return (
    <Box p={5}>
      <Box sx={{ textAlign: "center", pb: 4 }}>
        <TextField onChange={handleSearch} placeholder="Search Movies" />
      </Box>
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            paddingTop: "30px",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {!isLoading && (
        <Box>
          {allMovies.length ? (
            allMovies.map((movie, index) => (
              <Card sx={{ maxWidth: 345 }} key={index}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe">{movie.Title.charAt(0)}</Avatar>
                  }
                  title={movie.Title}
                  subheader={movie.Released}
                />
                <CardMedia
                  component="img"
                  height="194"
                  image={movie.Poster}
                  alt="Paella dish"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {movie.Plot}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <Favorite />
                  </IconButton>
                  <IconButton aria-label="share">
                    <Share />
                  </IconButton>
                </CardActions>
              </Card>
            ))
          ) : (
            <Box>
              <Typography align="center">No Available Data</Typography>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}

export default App;
