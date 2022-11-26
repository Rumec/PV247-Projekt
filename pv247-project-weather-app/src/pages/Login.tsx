import { Button, Paper, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router';

import useField from '../hooks/useField';
import { signIn, signUp } from '../utils/firebase';
import useTitle from '../hooks/useTitle';

const Login = () => {
	useTitle('Login');

	const navigate = useNavigate();

	const [isRegistration, setIsRegistration] = useState(false);

	const [email, usernameProps] = useField('email', true);
	const [password, passwordProps] = useField('password', true);

	const [submitError, setSubmitError] = useState<string>();

	return (
		<Box
			sx={{
				width: '30rem',
				display: 'flex',
				height: '100vh',
				alignItems: 'center',
				padding: 0
			}}
		>
			<Paper
				component="form"
				onSubmit={async (e: FormEvent) => {
					e.preventDefault();
					try {
						isRegistration
							? await signUp(email, password)
							: await signIn(email, password);
						navigate('/LocationList');
					} catch (err) {
						setSubmitError(
							(err as { message?: string })?.message ?? 'Unknown error occurred'
						);
					}
				}}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
					p: 4,
					gap: 2
				}}
			>
				<Typography variant="h4" component="h2" textAlign="center" mb={3}>
					Sign in
				</Typography>
				<TextField label="Email" {...usernameProps} type="email" />
				<TextField label="Password" {...passwordProps} type="password" />
				<Box
					sx={{
						display: 'flex',
						gap: 2,
						alignItems: 'center',
						alignSelf: 'flex-end',
						mt: 2
					}}
				>
					{submitError && (
						<Typography
							variant="caption"
							textAlign="right"
							sx={{ color: 'error.main' }}
						>
							{submitError}
						</Typography>
					)}
					<Button
						type="submit"
						variant="outlined"
						onClick={() => setIsRegistration(true)}
					>
						SignUp
					</Button>
					<Button type="submit" variant="contained">
						SignIn
					</Button>
				</Box>
			</Paper>
		</Box>
	);
};

export default Login;
