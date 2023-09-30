import './Navbar.css';
export default function Navbar(){
    return(
        <nav className="nav">
           <div class="dropdown">
           <a href="/" class="dropbtn">Beam Team 131</a>
           <div class="dropdown-content">
           <a href="/home">Home</a>
            <a href="/about">About</a>
           </div>
           </div>

            
        </nav>
    )
}