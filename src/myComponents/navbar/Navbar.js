import { Container, Link, Box } from "@mui/material";
import { useNavigate } from "react-router";
import "./style.css"

export default function NavBar() {
  const navigate = useNavigate();
  const url = window.location.pathname;

  const navigateToLink = (event, link) => {
    event.preventDefault()
    navigate(link);
  }

  return (
    <>
      <Box>
        <Container>
          <Box sx={{ height: '4rem' }}>
            {url.length < 2 ? <Link sx={{
              textDecoration: 'none',
              lineHeight: '4rem',
              cursor: "pointer",
              color: "red",
              fontSize: "18px",
              mr: "10px"
            }}
              onClick={(event) => navigateToLink(event, "/")}>HOME</Link>
              :
              <Link sx={{
                textDecoration: 'none',
                lineHeight: '4rem',
                cursor: "pointer",
                color: "white",
                fontSize: "18px",
                mr: "10px"
              }}
                onClick={(event) => navigateToLink(event, "/")}>HOME</Link>
            }
            {url.length > 2 ? <Link sx={{
              textDecoration: 'none',
              lineHeight: '4rem',
              cursor: "pointer",
              color: "red",
              fontSize: "18px",
              mr: "10px"
            }}
              onClick={(event) => navigateToLink(event, "/crypto-page")}> CRYPTO</Link>
              :
              <Link sx={{
                textDecoration: 'none',
                lineHeight: '4rem',
                cursor: "pointer",
                color: "white",
                fontSize: "18px",
                mr: "10px"
              }}
                onClick={(event) => navigateToLink(event, "/crypto-page")}> CRYPTO</Link>
            }
          </Box>
        </Container>
      </Box>
    </>
  )
}