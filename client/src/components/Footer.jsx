import React from 'react'
import '../css/Footer.css'

const Footer = () => {
  return (
    <div>
<footer class="footer-distributed">

			<div class="footer-left">

				<h3>Aero<span>Book</span></h3>

				<p class="footer-links">
					<a href="/" >Home</a>
					
					<a href="/flight">View Flights</a>
				
					<a href="/book">Book Fights</a>
				
					<a href="#">About</a>
					
					
					
					<a href="#">Contact</a>
				</p>

				<p class="footer-company-name">AeroBook © 2024</p>
			</div>

			<div class="footer-center">

				<div>
					<i class="fa fa-map-marker"></i>
					<p><span>111,Vidya sagar road,</span> Solana Beach, California</p>
				</div>

				<div>
					<i class="fa fa-phone"></i>
					<p>+1.555.555.5555</p>
				</div>

				<div>
					<i class="fa fa-envelope"></i>
					<p><a href="mailto:support@company.com">aerobook@company.com</a></p>
				</div>

			</div>

			<div class="footer-right">

				<p class="footer-company-about">
					<span>About the company</span>
                    Welcome to AeroBook, your trusted partner for hassle-free flight bookings. With a commitment to providing excellent service, we make your travel experience memorable and convenient.
				</p>

				<div class="footer-icons">

					<a href="#"><i class="fa fa-facebook"></i></a>
					<a href="#"><i class="fa fa-twitter"></i></a>
					<a href="#"><i class="fa fa-linkedin"></i></a>
					<a href="#"><i class="fa fa-github"></i></a>

				</div>

			</div>
            <h3 style={{fontSize:1.5+"em",textAlign:"center",marginLeft:-8+"em"}}>Made with Love by <span style={{color:"red"}}>Navi</span></h3>


		</footer>


    </div>
  )
}

export default Footer