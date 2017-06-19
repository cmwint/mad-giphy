import React from 'react';

// styling
import './Footer.css';

const Footer = () => {
	// stateless functional component
	return(
		<div className="footer">
			<div className="footer__wrap">
				<div className="footer__copyright">© 2017 Corinne Winthrop</div>
				<div className="footer__site">
					<a href="http://corinnewinthrop.com/" rel="noopener noreferrer" target="_blank">Check out my website!</a>
				</div>
			</div>
		</div>
	)
}

export default Footer;
