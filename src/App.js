import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./Login";
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import Player from "./Player";
import { useStateValue } from "./StateProvider";

const spotify = new SpotifyWebApi();

function App() {
  const [{ user, token }, dispatch] = useStateValue();

  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;
    if (_token) {
      console.log(_token);
      //setToken(_token);
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      spotify.setAccessToken(_token);
      spotify.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user: user,
        });
      });
      spotify.getUserPlaylists().then((playlist) => {
        console.log("playlist", playlist);
        dispatch({
          type: "SET_PLAYLIST",
          playlist: playlist,
        });
      });

      spotify
        .getPlaylist("37i9dQZF1DX8qj1nSNkJqB")
        .then((response) => {
          dispatch({
            type: "SET_WEEKLY_PLAYLIST",
            weekly_playlist: response,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  console.log(user);
  return (
    <div className="app">
      {token ? <Player spotify={spotify} /> : <Login />}
    </div>
  );
}

export default App;
