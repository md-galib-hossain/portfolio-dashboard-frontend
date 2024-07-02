import { Box,  List, Stack, Typography } from "@mui/material"

import Image from "next/image";
import logo from "@/assets/svgs/logo.svg"
import Link from "next/link";
import { drawerItems } from "@/utils/drawerItems";
import SidebarItem from "./SidebarItem";
const SideBar = () => {
 
  return (
<Box>
  <Stack sx={{
    py : 1,
    mt : 1,
    textDecoration : "none",
    color : "#707070"
  }} gap={1} direction="row" alignItems="center" justifyContent="center"
  component={Link}
  href="/"
  >
    <Image src = {logo} width={40} height={40} alt="logo"/>
    <Typography sx={{
      cursor : "pointer"
    }} variant="h6" component="h1" >Dashboard</Typography>
  </Stack>
  <List>
        {drawerItems()?.map((item, index) => (
         <SidebarItem key={index} index={index} item={item}/>
        ))}
      </List>
</Box>

  )
}

export default SideBar