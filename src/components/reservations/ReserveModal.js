/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { HowToRegOutlined } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import ReserveForm from './ReserveForm';
import store from '../../redux/configureStore';
import { expandModal } from '../../redux/reservations/reservationsSlice';

const ReserveBtn = styled(Button)`
  padding: 0.5rem;
  border-radius: 20px;
  width: 150px;
  background-color: #97BF11 !important;
  text-decoration: none;
  text-align: center !important;
  color: white !important;
  cursor: pointer;
  &:hover {
    color: white !important;
    background-color: #9fcf01 !important;
  } 
`;

const ActionButton = styled(Button)`
  padding: 0.5rem;
  border-radius: 20px;
  width: 150px;
  background-color: #f6a40e !important;
  text-decoration: none;
  text-align: center !important;
  color: white !important;
  transition: all 0.5s ease-in-out;
  &:hover {
    color: black !important;
    background-color: #ffefd5 !important;
    border: 1px solid #f6a40e !important;
  }
`;

const Title = styled(DialogTitle)`
  background-color: #f6a40e; 
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
`;

const Content = styled(DialogContent)`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  & > .desc {
    font-size: 1rem;
    font-weight: bold;
    font-family: 'Urbanist', sans-serif;
  }`;

const AmountText = styled(Typography)`
  font-size: 1rem;
  font-weight: bold;
  text-shadow: 1px 1px 1px #f6a40e;
  font-family: 'Urbanist', sans-serif;
  color: black;
`;

const DateContainer = styled(Typography)`
  display: flex;
  font-size: 16px;
  width: 100%;
`;

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(2),
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <Title sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </Title>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

const ReserveModal = () => {
  const { openModal } = useSelector((state) => state.reservations.utils);

  const toggleModal = () => {
    store.dispatch(expandModal(!openModal));
  };

  return (
    <>
      <ReserveBtn variant="outlined" onClick={toggleModal}>
        <HowToRegOutlined />
        Reserve
      </ReserveBtn>

      <BootstrapDialog
        onClose={toggleModal}
        aria-labelledby="customized-dialog-title"
        open={openModal}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={toggleModal}>
          Reserve Car
        </BootstrapDialogTitle>
        <Content dividers>
          <Typography gutterBottom className="desc">
            Reserve this car for a period of time.
          </Typography>
          <DateContainer>
            <ReserveForm />
          </DateContainer>
          <AmountText>
            Total Amount:
            {' '}
            <span>$</span>
            <span>0</span>
          </AmountText>
        </Content>
        <DialogActions>
          <ActionButton autoFocus onClick={() => console.log('I was clicked')}>
            Reserve
          </ActionButton>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};

export default ReserveModal;
