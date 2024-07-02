import { TDrawerItem } from "@/types";
//icons
import InterestsIcon from '@mui/icons-material/Interests';
import SchoolIcon from '@mui/icons-material/School';
import EngineeringIcon from '@mui/icons-material/Engineering';
import CodeIcon from '@mui/icons-material/Code';
import PersonIcon from '@mui/icons-material/Person';
import RssFeedIcon from '@mui/icons-material/RssFeed';
export const drawerItems = () : TDrawerItem[]=>{



const defaultMenus = [
    {
       title: 'Profile',
       path: `/profile`,
       icon: PersonIcon,
    },
    {
       title: 'Projects',
       path: `/projects`,
       icon: CodeIcon,
    },
    {
       title: 'Blogs',
       path: `/blogs`,
       icon: RssFeedIcon,
    },
    {
       title: 'Skills',
       path: `/skills`,
       icon: EngineeringIcon,
    },
    {
       title: 'Education',
       path: `/educations`,
       icon: SchoolIcon,
    },
    {
       title: 'Social Platforms',
       path: `/socials`,
       icon: InterestsIcon,
    },
    
 ];


        
   
return [ ...defaultMenus];
}