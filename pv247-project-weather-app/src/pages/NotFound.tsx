import { Box, Typography } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

const NotFound = () => (
	<Box
		sx={{
			width: '100vw',
			display: 'flex',
			height: '100vh',
			alignItems: 'center',
			justifyContent: 'space-around',
			padding: 0
		}}
	>
		<WarningIcon sx={{ typography: 'h1', color: 'yellow' }} />
		<Typography variant="h1" fontWeight="bolded">
			Page Not Found
		</Typography>
		<WarningIcon sx={{ typography: 'h1', color: 'yellow' }} />
	</Box>
);

export default NotFound;
