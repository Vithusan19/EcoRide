// src/components/LoadingAnimation.js
import './LoadingAnimation.css'; 
import logo from '../assets/weblogo.png';

const LoadingAnimation = () => {
    return (
        <div className="loading-animation">
            <div className="loading-cube"> {/* Updated class name */}
                <div className="loading-face loading-front"> {/* Updated class name */}
                    <img src={logo} alt="logo" className="nav-img" />
                </div>
                <div className="loading-face loading-back"> {/* Updated class name */}
                    <img src={logo} alt="logo" className="nav-img" />
                </div>
                <div className="loading-face loading-left"> {/* Updated class name */}
                    <img src={logo} alt="logo" className="nav-img" />
                </div>
                <div className="loading-face loading-right"> {/* Updated class name */}
                    <img src={logo} alt="logo" className="nav-img" />
                </div>
                <div className="loading-face loading-top"> {/* Updated class name */}
                    <img src={logo} alt="logo" className="nav-img" />
                </div>
                <div className="loading-face loading-bottom"> {/* Updated class name */}
                    <img src={logo} alt="logo" className="nav-img" />
                </div>
            </div>

            <h2 className="loading-text">Loading...</h2>
        </div>
    );
};

export default LoadingAnimation;
