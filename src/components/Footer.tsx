const Footer: React.FC = () => {
    return (
        <div className="main-footer">
            {/* Left Section: Buttons */}
            <div className="footer-left">
                <button className="footer-btn">Bord</button>
                <button className="footer-btn">Öppen</button>
                <button className="footer-btn">Mer</button>
                <button className="footer-btn">Kvitton</button>
            </div>

            {/* Right Section: Clock & Status */}
            <div className="footer-right">
                <span className="footer-clock">10:01:00</span>
                <span className="footer-status">&#10003;</span>
            </div>
        </div>

    );
};

export default Footer;
