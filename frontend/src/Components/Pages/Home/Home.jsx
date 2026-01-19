import useAuth from '../../../State/loginContext/LoginContext'
import { Link } from 'react-router-dom'
import Navigation from '../../Navigation/Navigation'
import { Button } from '@mui/material'

function Home() {

  const auth = useAuth()

  return (
    <div>
      <Navigation />
      {!auth.isAuthenticated ? 'Please Login to access Chat.' : (<Link to={`/chat`}>
        <Button
          sx={{ mt: 2 }}
          variant="contained"
          type="submit"
        >
          To Chat.
        </Button>
      </Link>)}
    </div>
  )
}

export default Home