import { LiveMessage } from 'react-aria-live'
import { Typography } from '@/src/components/shared/Typography/Typography'

type ErrorMessageProps = {
  errorMessage: string
  className?: string
  id?: string
}

export const AriaLiveErrorMessage = ({ errorMessage = '', className, id }: ErrorMessageProps) => (
  <>
    {errorMessage && (
      <p id={id} role='alert' className={className}>
        <Typography as='span' variant='T12Soft'>
          {errorMessage}
        </Typography>
      </p>
    )}
    <LiveMessage aria-live='polite' message={errorMessage} />
  </>
)
