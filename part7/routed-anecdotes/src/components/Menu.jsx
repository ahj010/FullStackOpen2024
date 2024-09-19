import { Link } from "react-router-dom"

const Menu = () => {

  const padding = {
    paddingRight: 300,
    marginLeft: 50,
    backgroundColor: '#E3D9AF',
    color: '#076e99'

  }

    return (
      <nav>
        <Link to='/' style={padding}>anecdotes</Link>
        <Link to='create' style={padding}>create new</Link>
        <Link to='about' style={padding}>about</Link>
      </nav>
    )
  }

  export default Menu
