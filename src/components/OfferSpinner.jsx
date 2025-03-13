import React, { useState } from "react";
import { 
    Box, 
    Button, 
    Typography, 
    styled, 
    Zoom,
    Fade 
} from "@mui/material";
import {
    EmojiEvents as TrophyIcon,
    Celebration as CelebrationIcon,
} from '@mui/icons-material';
import { Wheel } from "react-custom-roulette";
import offers from "../utils/offers";
import CouponModal from "./CouponModal";
import { motion } from "framer-motion";

const HeaderWrapper = styled(Box)({
    textAlign: 'center',
    width: '100%',
    padding: '30px 0',
    color: 'white',
    zIndex: 2,
    background: 'linear-gradient(180deg, rgba(102,126,234,0.9) 0%, rgba(102,126,234,0) 100%)',
});

const WheelContainer = styled(Box)({
    position: 'relative',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    gap: '20px',
});

const SpinButton = styled(Button)({
    padding: '15px 50px',
    fontSize: '1.4rem',
    backgroundColor: '#2A2A5C',
    color: 'white',
    borderRadius: '25px',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'scale(1.05)',
        backgroundColor: '#1A1A4C',
    },
    '&.Mui-disabled': {
        backgroundColor: '#9999AA',
        color: 'white',
    }
});

const OfferSpinner = () => {
    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedOffer, setSelectedOffer] = useState(null);

    const wheelData = offers.map(({ option, backgroundColor, textColor }) => ({
        option,
        style: {
            backgroundColor,
            textColor,
            fontWeight: 'bold',
            padding: '10px',
            lineHeight: '1.4',
            textAlign: 'center'
        }
    }));

    const handleSpinClick = () => {
        if (!mustSpin) {
            const newPrizeNumber = Math.floor(Math.random() * offers.length);
            setPrizeNumber(newPrizeNumber);
            setMustSpin(true);
        }
    };

    const handleStopSpinning = () => {
        setMustSpin(false);
        setSelectedOffer(offers[prizeNumber]);
        setModalOpen(true);
    };

    return (
        <WheelContainer>
            <Fade in={true} timeout={1000}>
                <HeaderWrapper>
                    <Typography variant="h2" sx={{ 
                        fontWeight: 'bold',
                        fontSize: { xs: '2rem', md: '3rem' },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2
                    }}>
                        Spin & Win! <TrophyIcon sx={{ fontSize: 40 }} />
                    </Typography>
                    <Typography variant="h5" sx={{ mt: 2 }}>
                        Try your luck and win amazing offers
                    </Typography>
                </HeaderWrapper>
            </Fade>

            <Zoom in={true} timeout={800}>
                <Box sx={{ 
                    position: 'relative',
                    width: '900px',
                    height: '900px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Wheel
                        mustStartSpinning={mustSpin}
                        prizeNumber={prizeNumber}
                        data={wheelData}
                        onStopSpinning={handleStopSpinning}
                        outerBorderWidth={2}
                        outerBorderColor="#ffffff"
                        innerBorderWidth={0}
                        radiusLineWidth={1}
                        radiusLineColor="#ffffff"
                        fontSize={9}
                        textDistance={55}
                        width={900}
                        height={900}
                    />
                </Box>
            </Zoom>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <SpinButton
                    variant="contained"
                    onClick={handleSpinClick}
                    disabled={mustSpin}
                    startIcon={<CelebrationIcon />}
                >
                    {mustSpin ? 'SPINNING...' : 'SPIN NOW!'}
                </SpinButton>
            </motion.div>

            <CouponModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                offer={selectedOffer}
            />
        </WheelContainer>
    );
};

export default OfferSpinner;