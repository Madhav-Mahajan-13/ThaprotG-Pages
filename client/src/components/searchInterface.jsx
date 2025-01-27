import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Avatar,
  Container,
  Snackbar,
  Box,
} from "@mui/material";
import { Search as SearchIcon, Clear as ClearIcon } from "@mui/icons-material";
import { useContext } from "react";
import { MyContext } from "../context/context.jsx";

function UserCard({ user, onConnect }) {
  return (
    <Card
      variant="outlined"
      sx={{ "&:hover": { boxShadow: 3 }, transition: "box-shadow 0.3s" }}
    >
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            src={user.imageUrl || "/placeholder.svg"}
            alt={`${user.name}'s profile`}
            sx={{ width: 56, height: 56 }}
          />
          <Box>
            <Typography variant="h6">{user.first_name +" "+ user.last_name}</Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          onClick={() => onConnect(user.id)}
          sx={{
            bgcolor: "purple",
            "&:hover": { bgcolor: "darkpurple" },
            color: "white",
          }}
        >
          Connect
        </Button>
      </CardContent>
    </Card>
  );
}

export default function SearchInterface() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const { backendHost } = useContext(MyContext);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(
        `${backendHost}/api/user/search/${searchQuery}`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setSearchResults(data.data || []);
    } catch (error) {
      console.error("Error fetching users:", error.message);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = (userId) => {
    console.log(`Connecting with user ${userId}`);
    setOpenSnackbar(true);
  };

  const handleClear = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <form
        onSubmit={handleSearch}
        style={{ display: "flex", marginBottom: "24px" }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ mr: -1 }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            bgcolor: "purple",
            "&:hover": { bgcolor: "darkpurple" },
            color: "white",
          }}
          aria-label="Search"
        >
          <SearchIcon />
        </Button>
      </form>

      {searchResults.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            variant="outlined"
            startIcon={<ClearIcon />}
            onClick={handleClear}
            sx={{
              color: "purple",
              borderColor: "purple",
              "&:hover": {
                bgcolor: "rgba(128, 0, 128, 0.04)",
                borderColor: "darkpurple",
              },
            }}
          >
            Clear Results
          </Button>
        </Box>
      )}

      <Box sx={{ display: "grid", gap: 2 }}>
        {loading ? (
          <Typography align="center" color="textSecondary">
            Loading...
          </Typography>
        ) : (
          <>
            {searchResults.map((user) => (
              <UserCard user={user} onConnect={handleConnect} key={user.id} />
            ))}
            {searchResults.length === 0 && searchQuery && !loading && (
              <Typography align="center" color="textSecondary">
                No users found
              </Typography>
            )}
          </>
        )}
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message="Connection request sent successfully"
      />
    </Container>
  );
}
