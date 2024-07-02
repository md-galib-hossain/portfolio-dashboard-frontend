import { Box, Typography, Stack, styled } from '@mui/material';

const StyledInformationBox = styled(Box)(({ theme }) => ({
  background: '#f4f7fe',
  borderRadius: theme.spacing(1),
  width: '45%',
  padding: '8px 16px',
  '& p': {
    fontWeight: 600,
  },
}));

const ProfileDisplay = ({ data }: any) => {
  return (
    <>
      <Typography variant="h5" color="primary.main" mb={2}>
        Personal Information
      </Typography>
      <Stack direction={{ xs: 'column', md: 'row' }} gap={2} flexWrap={'wrap'}>
        <StyledInformationBox>
          <Typography color="secondary" variant="caption">
            Name
          </Typography>
          <Typography>{data?.name}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography color="secondary" variant="caption">
            Email
          </Typography>
          <Typography>{data?.email}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography color="secondary" variant="caption">
            Role
          </Typography>
          <Typography>{data?.role}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography color="secondary" variant="caption">
            Headline
          </Typography>
          <Typography>{data?.headline}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography color="secondary" variant="caption">
            Age
          </Typography>
          <Typography>{data?.age}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography color="secondary" variant="caption">
            Status
          </Typography>
          <Typography>{data?.status}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography color="secondary" variant="caption">
            About Me
          </Typography>
          <Typography>{data?.aboutMe}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography color="secondary" variant="caption">
            Present Address
          </Typography>
          <Typography>{data?.presentAddress}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography color="secondary" variant="caption">
            Permanent Address
          </Typography>
          <Typography>{data?.permanentAddress}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography color="secondary" variant="caption">
            Resume Link ID
          </Typography>
          <Typography>{data?.resumeLinkId}</Typography>
        </StyledInformationBox>
      </Stack>
    </>
  );
};

export default ProfileDisplay;
