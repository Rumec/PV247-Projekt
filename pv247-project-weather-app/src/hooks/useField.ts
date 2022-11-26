import { ChangeEvent, useCallback, useMemo, useState } from 'react';

const useField = (id: string, required?: boolean) => {
	const [fieldValue, setFieldValue] = useState('');
	const [isTouched, setIsTouched] = useState(false);

	const errorOccured = useMemo(
		() => required && isTouched && !fieldValue,
		[isTouched, fieldValue]
	);

	return [
		fieldValue,
		{
			id,
			value: fieldValue,
			onChange: useCallback(
				(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
					setFieldValue(e.target.value),
				[]
			),
			onBlur: useCallback(() => setIsTouched(true), []),
			required,
			error: errorOccured,
			helperText: errorOccured ? 'Required filed' : undefined
		}
	] as const;
};

export default useField;
