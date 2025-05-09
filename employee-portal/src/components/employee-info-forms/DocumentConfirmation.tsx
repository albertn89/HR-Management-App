import { Box, Typography } from '@mui/material';

import { useAppSelector } from '../../store';
import FileUploadWithPreview from '../FileUploadWithPreview';

export default function DocumentConfirmation() {
  const profilePicture = useAppSelector((state) => state.employeeForm.personalInfo.profilePicture);
  const driverLicense = useAppSelector(
    (state) => state.employeeForm.driverAndCar.driverLicense.license
  );
  const authDocument = useAppSelector(
    (state) => state.employeeForm.workAuth.extraAuthInfo.optReceipt
  );

  return (
    <>
      <Box>
        <Box>
          <Typography variant="h6" mt={4} mb={1}>
            Profile Picture
          </Typography>
          {!profilePicture?.name ? (
            <Typography variant="body1">Nothing uploaded</Typography>
          ) : (
            <FileUploadWithPreview
              previewOnly
              width="200px"
              height="200px"
              previewURL={profilePicture.url}
              fileName={profilePicture.name}
              type="image"
            />
          )}
        </Box>
        <Box>
          <Typography variant="h6" mt={4} mb={1}>
            Driver&apos;s License
          </Typography>
          {!driverLicense?.name ? (
            <Typography variant="body1">Nothing uploaded</Typography>
          ) : (
            <FileUploadWithPreview
              previewOnly
              previewURL={driverLicense.url}
              fileName={driverLicense.name}
              type="document"
            />
          )}
        </Box>
        <Box>
          <Typography variant="h6" mt={4} mb={1}>
            Work Authorization Documents
          </Typography>
          {!authDocument?.name ? (
            <Typography variant="body1">Nothing uploaded</Typography>
          ) : (
            <FileUploadWithPreview
              previewOnly
              previewURL={authDocument.url}
              fileName={authDocument.name}
              type="document"
            />
          )}
        </Box>
      </Box>
    </>
  );
}
