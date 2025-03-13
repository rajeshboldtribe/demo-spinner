import React, { useState } from 'react';
import { 
  Modal, 
  Box, 
  Typography, 
  Button,
  IconButton,
  Alert,
  Fade,
  styled 
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import confetti from 'canvas-confetti';
import offers from '../utils/offers';

const ModalContent = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 320,
  backgroundColor: 'white',
  borderRadius: '10px',
  padding: '20px',
  textAlign: 'center',
  boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
});

const CouponBox = styled(Box)({
  margin: '20px 0',
  padding: '15px',
  backgroundColor: '#f5f5f5',
  borderRadius: '5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  border: '2px dashed #2A2A5C',
});

const AnimatedTitle = styled(Typography)({
  animation: 'bounce 1s infinite',
  color: '#2A2A5C',
  '@keyframes bounce': {
    '0%, 100%': {
      transform: 'translateY(0)',
    },
    '50%': {
      transform: 'translateY(-10px)',
    },
  },
});

const CongratulationsText = styled(Typography)({
  animation: 'fadeInUp 1s',
  '@keyframes fadeInUp': {
    from: {
      opacity: 0,
      transform: 'translateY(20px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
});

const CouponModal = ({ open, onClose, offer }) => {
  const [showCopyAlert, setShowCopyAlert] = useState(false);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleCopyCode = () => {
    if (offer?.coupon) {
      navigator.clipboard.writeText(offer.coupon);
      setShowCopyAlert(true);
      setTimeout(() => setShowCopyAlert(false), 3000);
    }
  };

  React.useEffect(() => {
    if (open) {
      triggerConfetti();
    }
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="coupon-modal-title"
    >
      <ModalContent>
        <AnimatedTitle variant="h4" component="h1" gutterBottom>
          🎉 Congratulations! 🎉
        </AnimatedTitle>
        
        <CongratulationsText variant="h6" gutterBottom sx={{ mt: 2 }}>
          You have won
        </CongratulationsText>
        
        <Typography 
          variant="h5" 
          component="div" 
          sx={{ 
            color: '#2A2A5C',
            fontWeight: 'bold',
            my: 2
          }}
        >
          {offer?.option}
        </Typography>

        <CouponBox>
          <Typography 
            variant="h5" 
            component="span" 
            sx={{ 
              fontWeight: 'bold',
              letterSpacing: '1px'
            }}
          >
            {offer?.coupon}
          </Typography>
          <IconButton 
            onClick={handleCopyCode} 
            size="large"
            sx={{ 
              color: '#2A2A5C',
              '&:hover': {
                backgroundColor: 'rgba(42, 42, 92, 0.1)'
              }
            }}
          >
            <ContentCopyIcon />
          </IconButton>
        </CouponBox>

        <Fade in={showCopyAlert}>
          <Alert 
            severity="success" 
            sx={{ 
              position: 'absolute',
              bottom: -60,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '90%'
            }}
          >
            Coupon Copied Successfully!
          </Alert>
        </Fade>

        <Button 
          variant="contained" 
          onClick={onClose}
          sx={{ 
            mt: 3,
            backgroundColor: '#2A2A5C',
            '&:hover': {
              backgroundColor: '#1A1A4C'
            }
          }}
        >
          Close
        </Button>
      </ModalContent>
    </Modal>
  );
};

export default CouponModal;