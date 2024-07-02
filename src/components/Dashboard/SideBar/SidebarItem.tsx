import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled
} from "@mui/material";
import Link from "next/link";
import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { TDrawerItem } from "@/types";
import { usePathname } from "next/navigation";

// Create a styled version of the Link component
const StyledLink = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
  '&:hover': {
    textDecoration: 'none',
  }
});

const SidebarItem = ({ item, index }: { item: TDrawerItem; index: number }) => {
  const linkPath = `${item?.path}`;
  const pathName = usePathname();
  console.log(pathName);

  return (
    <StyledLink href={linkPath}>
      <ListItem 
        disablePadding 
        sx={{
          ...(pathName === linkPath ? {borderRight: "3px solid #0582CA", "& svg": { color: "#0582CA" } } : {}),
          mb: 1
        }}
      >
        <ListItemButton>
          <ListItemIcon>
            {item?.icon && <item.icon />} 
          </ListItemIcon>
          <ListItemText primary={item?.title} />
        </ListItemButton>
      </ListItem>
    </StyledLink>
  );
};

export default SidebarItem;
