import { Grid, TextField } from '@mui/material';

import useErrorMap from '../../../contexts/error-map/useErrorMap';
import { Contact } from '../../../store/slices/employeeTypes';
import { useTextFieldProps } from '../../useTextFieldProps';

export default function ContactForm({
  id,
  used,
  contact,
  updateContact,
  forceCheck,
  readOnly,
}: {
  id: string;
  contact: Contact;
  updateContact: (patch: Partial<Contact>) => void;
  used: boolean;
  readOnly: boolean;
  forceCheck: boolean;
}) {
  const { updateErrorMap } = useErrorMap();
  const firstNameProps = useTextFieldProps(
    {
      name: `${id}-firstName`,
      get: () => contact.firstName ?? '',
      set: (v) => updateContact({ firstName: v }),
      required: used,
      readOnly,
    },
    forceCheck,
    updateErrorMap
  );

  const lastNameProps = useTextFieldProps(
    {
      name: `${id}-lastName`,
      get: () => contact.lastName ?? '',
      set: (v) => updateContact({ lastName: v }),
      required: used,
      readOnly,
    },
    forceCheck,
    updateErrorMap
  );

  const middleNameProps = useTextFieldProps(
    {
      name: `${id}-middleName`,
      get: () => contact.middleName ?? '',
      set: (v) => updateContact({ middleName: v }),
      required: false,
      readOnly,
    },
    forceCheck,
    updateErrorMap
  );

  const cellPhoneProps = useTextFieldProps(
    {
      name: `${id}-cellPhone`,
      get: () => contact.phone ?? '',
      set: (v) => updateContact({ phone: v }),
      required: used,
      type: 'phone',
      readOnly,
    },
    forceCheck,
    updateErrorMap
  );

  const emailProps = useTextFieldProps(
    {
      name: `${id}-email`,
      get: () => contact.email ?? '',
      set: (v) => updateContact({ email: v }),
      required: used,
      type: 'email',
      readOnly,
    },
    forceCheck,
    updateErrorMap
  );

  const relationshipProps = useTextFieldProps(
    {
      name: `${id}-relationship`,
      get: () => contact.relationship ?? '',
      set: (v) => updateContact({ relationship: v }),
      required: used,
      readOnly,
    },
    forceCheck,
    updateErrorMap
  );

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField label="First Name" {...firstNameProps()} />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField label="Last Name" {...lastNameProps()} />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <TextField label="Middle Name" {...middleNameProps()} />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField label="Cell Phone" {...cellPhoneProps()} />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField label="Email" {...emailProps()} />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TextField label="Relationship" {...relationshipProps()} />
      </Grid>
    </Grid>
  );
}
