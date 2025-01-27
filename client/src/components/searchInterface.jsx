import React, { useState } from "react"
import { TextField, Button, Card, CardContent, Typography, Avatar, Grid, Container, Snackbar, Box } from "@mui/material"
import { Search as SearchIcon, Clear as ClearIcon } from "@mui/icons-material"

const mockUsers = [
  {
    id: "1",
    name: "Alex Thompson",
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "2",
    name: "Sam Wilson",
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "3",
    name: "Jordan Lee",
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
]

function UserCard({ user, onConnect }) {
  return (
    <Card variant="outlined" sx={{ "&:hover": { boxShadow: 3 }, transition: "box-shadow 0.3s" }}>
      <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar src={user.imageUrl} alt={`${user.name}'s profile`} sx={{ width: 56, height: 56 }} />
          <Box>
            <Typography variant="h6">{user.name}</Typography>
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
  )
}

export default function SearchInterface() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [openSnackbar, setOpenSnackbar] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    const results = mockUsers.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
    setSearchResults(results)
  }

  const handleConnect = (userId) => {
    console.log(`Connecting with user ${userId}`)
    setOpenSnackbar(true)
  }

  const handleClear = () => {
    setSearchQuery("")
    setSearchResults([])
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <form onSubmit={handleSearch} style={{ display: "flex", marginBottom: "24px" }}>
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

      <Grid container spacing={2}>
        {searchResults.map((user) => (
          <Grid item xs={12} key={user.id}>
            <UserCard user={user} onConnect={handleConnect} />
          </Grid>
        ))}
        {searchResults.length === 0 && searchQuery && (
          <Grid item xs={12}>
            <Typography align="center" color="textSecondary">
              No users found
            </Typography>
          </Grid>
        )}
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message="Connection request sent successfully"
      />
    </Container>
  )
}

